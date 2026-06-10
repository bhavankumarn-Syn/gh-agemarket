import { Modal } from "antd"
import "./avatarTryModel.scss"
type Props = {
    selectedTryAvatar: any;
    onClose: () => void;
  };

const AvatarTryMode: React.FC<Props>=({selectedTryAvatar,onClose})=>{
    return(
        <Modal
        open={!!selectedTryAvatar}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        width={"90%"}
        modalRender={(node) => (
            <div className="avatar-modal-wrapper">
              {node}
            </div>
        )}
      >
        <div className="avatarModelContent">
            <div className="avatarHeader">
                <div className="avatarHeading">
                    <p>Avatar</p>
                    <h4>{selectedTryAvatar?.name}</h4>
                </div>
            </div>
            <div className="iframeDiv">
                <iframe width={"100%"} height={"100%"} allow="microphone" src={selectedTryAvatar?.url}  />
            </div>
        </div>
    </Modal>
    )
}
export default AvatarTryMode