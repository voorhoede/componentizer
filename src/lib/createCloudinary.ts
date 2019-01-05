const createCloudinary = (cloudName: string, unsignedUploadPreset: string, onSuccess: Function): object => ({
  process: (fieldName: string, file: File, metadata: object, load: Function, error: Function, progress: Function, abort: Function) => {
    // `fieldName` and `meta` are not used for now  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.upload.addEventListener('progress', e => {
      progress(e.lengthComputable, e.loaded, e.total);
    });

    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        onSuccess(response);
        load();
        return;
      }

      error('oh no!');
    };

    formData.append('upload_preset', unsignedUploadPreset);
    formData.append('tags', 'browser_upload');
    formData.append('file', file);
    xhr.send(formData);
    
    return {
      abort: () => {
        xhr.abort();
      }
    }
  },
  revert: null
});

export default createCloudinary