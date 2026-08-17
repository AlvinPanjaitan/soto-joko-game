import '../styles/ResetModal.css';

export function ResetModal({ isOpen, onClose, onConfirm, bgTheme = 'kabel' }) {
  if (!isOpen) return null;

  return (
    <div className={`reset-modal-overlay theme-${bgTheme}`} onClick={onClose}>
      <div 
        className="reset-modal-card" 
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className="reset-modal-header">
          <span className="reset-modal-icon">⚠️</span>
          <h2 className="reset-modal-title">RESET PROGRESS?</h2>
        </div>


        <div className="reset-modal-body">
          <p className="reset-modal-text">
            Apakah kamu yakin ingin menghapus seluruh uang dan upgrade Warung Soto Joko?
          </p>
          <span className="reset-modal-subtext">
            Tindakan ini tidak dapat dibatalkan!
          </span>
        </div>


        <div className="reset-modal-actions">
          <button className="reset-btn cancel-btn" onClick={onClose}>
            BATAL
          </button>
          <button className="reset-btn confirm-btn" onClick={onConfirm}>
            YA, RESET!
          </button>
        </div>
      </div>
    </div>
  );
}