import * as React from 'react';
const { FilePond, registerPlugin } = require('react-filepond');
const  FilePondPluginImagePreview = require('filepond-plugin-image-preview');
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginImagePreview);

const FilePondWrapper = ({...props}) => (
  <FilePond {...props} />
);

export default FilePondWrapper