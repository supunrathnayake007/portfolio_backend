import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function CreateProjects() {
  const [selectedImage, setSelectedImage] = useState(null);
  const acceptedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    // You can perform validations on the file if needed

    // Display the selected image for preview if required
    setSelectedImage(URL.createObjectURL(file));

    // Now, you can save 'file' to your database or perform other operations
    // Send the 'file' to your backend for storage or processing
  };

  return (
    <div className="flex justify-center">
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default CreateProjects;
