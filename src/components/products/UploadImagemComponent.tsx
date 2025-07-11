import {upload_img} from './styles'


type Props = {
  imagens:any
  getInputProps:Function
  getRootProps:Function
  removerPreview:Function
}

export const UploadImagemComponent = ({
  imagens,
  getInputProps,
  getRootProps,
  removerPreview
}:Props) => {

  return (
    <>
  <b id='msg-green'>Escolha uma imagem de seu repositorio</b>
      <div {...getRootProps()} style={upload_img.dropzone}>
        <input {...getInputProps()} />
        <p id='msg-green'>Arraste e solte imagens aqui, ou clique para selecionar</p>
      </div>
      <div style={upload_img.preview}>
        {imagens.map((imagem:any) => (
          <div key={imagem.name} style={upload_img.thumb}>
            <img
              src={imagem.preview}
              alt={imagem.name}
              style={upload_img.image}
              onLoad={() => URL.revokeObjectURL(imagem.preview)} // Libera o objeto após o carregamento
            />
            <button onClick={() => removerPreview(imagem)} style={upload_img.removerBtn}>Remover</button>
          </div>
        ))}
      </div>
    </>
  );
};

