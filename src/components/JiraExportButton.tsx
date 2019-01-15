import * as React from 'react';
import JiraProjectList from './JiraProjectList';
import Button from './styled-components/Button';
import Warning from './styled-components/Warning';
import ModalFooter from './styled-components/ModalFooter';
import Error from './styled-components/Error';
import ErrorBoundary from 'react-error-boundary';
import Modal from './Modal';
import generateComponentImageUrl from '../lib/generateComponentImageUrl';
import { addIssues } from '../lib/jira';
import { Region } from './ImageEditor';
import { CloudinaryImage } from './ImageUploader';

interface TrelloExportButtonProps {
  regions: Region[]
  imgData: CloudinaryImage
  [propName: string]: {}
}

const onProjectSelect = async (projectId: string, regions: Region[], imgData: CloudinaryImage, setModalOpen: Function) => {
  const issues = regions.map(region => generateComponentImageUrl(region, imgData))

  await addIssues(issues, projectId)

  setModalOpen(false)
}

const JiraExportButton = ({ regions, imgData, ...props }: TrelloExportButtonProps) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setModalOpen(true)} >Export to Jira <span className="icon">🚀</span></Button>
      <Modal show={modalOpen}>
        <Warning>ℹ️ The cards will be added to the first list of the board.</Warning>

        <ErrorBoundary FallbackComponent={() => <Error>🤔 Something went wrong fetching the data.</Error>}>
          <JiraProjectList
            onProjectSelect={(id: string) => onProjectSelect(id, regions, imgData, setModalOpen)}
          />
        </ErrorBoundary>

        <ModalFooter>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default JiraExportButton

