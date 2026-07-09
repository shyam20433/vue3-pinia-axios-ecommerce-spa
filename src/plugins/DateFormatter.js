const dateformatter={
  install(app){
    app.config.globalProperties.$formatDate=(date)=>{
      //return new Date(date).toLocaleDateString() +" - " + new Date(date).toLocaleDateString('en-US',{weekday:'long'}) +" - " + new Date().toLocaleTimeString()
      return new Date(date).toDateString('en_US',{
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
      })
    }
  }
}

export default dateformatter
