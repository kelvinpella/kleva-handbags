const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImagesFromFolder(folderPath, bucketName = 'handbag-images', subFolder = '') {
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`Found ${imageFiles.length} images in ${folderPath}`);

  const uploadedUrls = [];

  for (const file of imageFiles) {
    const filePath = path.join(folderPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = subFolder ? `${subFolder}/${file}` : file;

    console.log(`Uploading ${file}...`);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType: `image/${path.extname(file).slice(1)}`,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${file}:`, error);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    uploadedUrls.push(publicUrl);
    console.log(`✓ Uploaded: ${publicUrl}`);
  }

  console.log('\n=== Upload Summary ===');
  console.log(`Total uploaded: ${uploadedUrls.length}`);
  console.log('\nURLs:');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  // Save URLs to file
  fs.writeFileSync(
    path.join(folderPath, 'uploaded-urls.json'),
    JSON.stringify(uploadedUrls, null, 2)
  );
  console.log('\nURLs saved to uploaded-urls.json');

  return uploadedUrls;
}

// Usage
const folderToUpload = process.argv[2] || './public/images/handbags';
const subFolder = process.argv[3] || 'new';

uploadImagesFromFolder(folderToUpload, 'handbag-images', subFolder)
  .then(() => console.log('Done!'))
  .catch(console.error);