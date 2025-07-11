export const upload_img = {
  dropzone: {
    border: '2px dashed #007bff',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
  },
  preview: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
  },
  thumb: {
    position: 'relative' as 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '4px',
    overflow: 'hidden' as 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  removerBtn: {
    position: 'absolute' as 'absolute',
    top: '5px',
    right: '5px',
    background: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '5px',
  },
};