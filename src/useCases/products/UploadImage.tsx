import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImagemComponent } from '../../components/products/UploadImagemComponent';

interface FileWithPreview extends File {
  preview: string | any;
}

export function UploadImagem() {

  const [imagens, setImagens] = useState<FileWithPreview[]>([]);

  function getUpdateImagem() {
    if (imagens.length > 0) {
      localStorage.setItem('update_imagem', JSON.stringify(imagens))
    }
  }

  useEffect(() => {
    getUpdateImagem()
  }, [imagens])

  const onDrop = useCallback((acceptedImagens: File[]) => {
    const imagensComPreview = acceptedImagens.map((imagem) => ({
      ...imagem,
      preview: URL.createObjectURL(imagem),
    }));
    setImagens((prevImagens) => [...prevImagens, ...imagensComPreview]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: { 'image/*': [] },
    accept: { '.jpg,.jpeg,.png,.pdf': [] }, // Tipos de arquivo permitidos
    maxFiles: 5, // Número máximo de arquivos
    maxSize: 10 * 1024 * 1024, // Tamanho máximo de
  });

  const removerPreview = (imagem: FileWithPreview) => {
    setImagens((prevImagens) => prevImagens.filter((f) => f !== imagem));
    URL.revokeObjectURL(imagem.preview);
  };

  return (
    <>
      <UploadImagemComponent
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        removerPreview={removerPreview}
        imagens={imagens}
      />
    </>
  )
}

function UseEfect(arg0: any) {
  throw new Error('Function not implemented.');
}
