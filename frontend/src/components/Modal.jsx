import { useEffect } from 'react';
import '.\styles\global.css';

const Modal = ({
    isOpen,
    onClose,
    children,
    title = ''
}) => {
    useEffect(() => {
        const handleEscape = (e) => e.key === 'Escape' && onClose();
        if (isOpen) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                {title && <h2 className="modal-title">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;