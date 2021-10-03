import { Testimonial } from "../models/testimoniales.js";

const guardarTestimonial = async (req, res)=>{
  // validar datos
  const {nombre, correo, mensaje} = req.body

  const errores = []

  if(nombre.trim() === ''){
    errores.push({mensaje:'Nombre está vacío'});
  }

  if(correo.trim() === ''){
    errores.push({mensaje:'Correo está vacío'});
  }

  if(mensaje.trim() === ''){
    errores.push({mensaje:'Mensaje está vacío'});
  }

  if (errores.length > 0) {
    // consultar testimoniales existentes    
    const testimoniales = await Testimonial.findAll()

    // mostrar vista con errores
    res.render('testimoniales',{
      pagina: 'Testimoniales',
      errores,
      nombre, 
      correo,
      mensaje,
      testimoniales
    })
  }else{
    // almacenar en base de datos
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje
      })
      res.redirect('/testimoniales')
    } catch (error) {
      console.log(error)
    }
  }

}

export{
  guardarTestimonial
}