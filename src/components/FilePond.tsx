import * as React from 'react';
const { FilePond } = require('react-filepond');

const FilePondWrapper: React.SFC<any> = ({...props}) => (
  <FilePond {...props} />
);

export default FilePondWrapper