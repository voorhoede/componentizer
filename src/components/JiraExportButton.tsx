import * as React from 'react';
import Button from './styled-components/Button';
import Warning from './styled-components/Warning';
import Error from './styled-components/Error';
import ErrorBoundary from 'react-error-boundary';
import Modal from './Modal';
import JiraProjectList from './JiraProjectList';

const JiraExportButton = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setModalOpen(true)} >Export to Jira <span className="icon">🚀</span></Button>
      <Modal show={modalOpen}>
        <Warning>ℹ️ The cards will be added to the first list of the board.</Warning>

        <ErrorBoundary FallbackComponent={() => <Error>🤔 Something went wrong fetching the data.</Error>}>
          <JiraProjectList />
        </ErrorBoundary>
      </Modal>
    </>
  )
}

export default JiraExportButton

