import { useMemo, useState, Fragment } from 'react';
import { Post } from '../../layouts/Post';
import dynamic from 'next/dynamic';
import ViewPost from '../../components/CustomEditor';

function PostEditorJsPage() {
  const [imageArray, setImageArray] = useState([]);
  let [editorInstance, setEditorInstance] = useState({});

  const handleInstance = (instance) => {
    setEditorInstance(instance);
  };

  const saveArticle = async (e) => {
    e.preventDefault();

    // get the editor.js content and save it to server
    const savedData = await editorInstance.save();

    const data = {
      description: JSON.stringify(savedData),
    };

    // Clear all the unused images from server
    await clearEditorLeftoverImages();

    // Save article to server
    // createArticle(data, files);
  };

  // This method will get the current images that are used by editor js,
  // and images that stored in imageArray. It will compare and call server request to 
  // remove unused imges
  const clearEditorLeftoverImages = async () => {
    // Get editorJs images
    const currentImages = [];
    document.querySelectorAll('.image-tool__image-picture')
      .forEach((x) => currentImages.push(x.src.includes('/images/') && x.src));

    if (imageArray.length > currentImages.length) {
      // image deleted
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            // delete image from backend
            // await API.deleteImage({imagePath: img})
            // remove from array
            // removeImage(img)
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    }
  };

  return (
    <Fragment>
      <button onClick={saveArticle}>Save</button>
      {/*<Post timecode={timecode} ogImage={ogImage} {...frontmatter}>*/}
      <div style={{height: '100vh'}}>
        {ViewPost ? <ViewPost handleInstance={handleInstance} imageArray={imageArray} /> : <div />}
      </div>
      {/*</Post>*/}
    </Fragment>
  );
}

export default PostEditorJsPage;