import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const separators = [',', 'Enter'];

const AddProduct = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleDelete = (indexToRemove) => {
    const filteredTags = tags.filter((tag, index) => index !== indexToRemove);
    setTags(filteredTags);
  };

  const handleAddition = (newTag) => {
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
  };

  const onSubmit = (data) => {
    const file = data.productImage[0];

    const product = {
      productName: data.productName,
      description: data.description,
      externalLink: data.externalLink || '',
      ownerName: user.displayName,
      ownerEmail: user.email,
      ownerImage: user.photoURL,
      tags: tags.map(tag => tag.text),
      productImageFile: file, 
      createdAt: new Date().toISOString()
    };

    console.log(product);

    Swal.fire('Success!', 'Product added successfully.', 'success');
    reset();
    setTags([]);
  };

  return (
    <div className='my-10'>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset max-w-3xl mx-auto p-10 bg-base-200 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a Product</h2>

        <div className="form-control mb-4 w-full">
            <label className="label">Product Name<span className="text-red-500 ml-1">*</span></label>
            <input
            type="text"
            {...register('productName', { required: true })}
            placeholder="Enter product name"
            className="input input-bordered w-full"
            />
            {errors.productName && <p className="text-error text-sm mt-1">Product name is required</p>}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Product Image<span className="text-red-500 ml-1">*</span></label>
            <input
            type="file"
            accept="image/*"
            {...register('productImage', { required: true })}
            className="file-input file-input-bordered w-full"
            />
            {errors.productImage && <p className="text-error text-sm mt-1">Product image is required</p>}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Description<span className="text-red-500 ml-1">*</span></label>
            <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Product description"
            />
            {errors.description && <p className="text-error text-sm mt-1">Description is required</p>}
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Name</label>
            <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Email</label>
            <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-4 w-full">
            <label className="label">Owner Image URL</label>
            <input
            type="text"
            value={user?.photoURL || ''}
            readOnly
            className="input input-bordered w-full bg-base-200"
            />
        </div>

        <div className="form-control mb-6 w-full">
            <label className="label">Tags</label>
            <ReactTags
            tags={tags}
            separators={separators}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            placeholder="Add tags and press Enter"
            classNames={{
                tags: 'flex flex-wrap gap-3 p-2 bg-base-100 border rounded-md',
                tagInput: 'w-full',
                tagInputField: 'input w-full h-8',
                tag: 'bg-primary text-white px-3 py-1 rounded-md',
                remove: 'ml-2 cursor-pointer text-sm'
            }}
            />
        </div>

        <div className="form-control mb-6 w-full">
            <label className="label">External Link (Optional)</label>
            <input
            type="url"
            {...register('externalLink')}
            placeholder="https://productsite.com"
            className="input input-bordered w-full"
            />
        </div>

        <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">Submit Product</button>
        </div>
        </form>
    </div>
  );
};

export default AddProduct;