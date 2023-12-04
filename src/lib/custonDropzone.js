import {Dropzone} from "dropzone";


Dropzone.options.images = {
    dictDefaultMessage:"Please load the selected images",//Por favor carga tus imagenes
    acceptedFiles: ".png, .jpg, .jpeg, .vmp, .svg",
    maxFilesize:5,
    maxFiles:1,
    paralelUploads:1,
    autoProccesQueue:false,
    addRemoveLinks: true,
    //dictRemoveFile:"Borrar fotografia"
   // dictMaxFilesExceeded:"Solamente una imagen"
}

