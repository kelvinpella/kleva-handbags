import ImageUploader from "@/components/Admin/ImageUploader";

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Upload Product Images
      </h1>
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <ImageUploader
          maxImages={5}
          onImagesUploaded={(urls) => {
            console.log('Uploaded URLs:', urls);
          }}
        />
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Select up to 5 images for a product</li>
          <li>Wait for upload to complete</li>
          <li>Copy the generated URLs array</li>
          <li>Use these URLs in your SQL INSERT statement</li>
        </ol>
      </div>
    </div>
  );
}