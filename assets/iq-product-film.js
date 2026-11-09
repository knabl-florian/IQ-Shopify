if(!customElements.get('iq-product-film')){
  customElements.define('iq-product-film',class extends HTMLElement{
    connectedCallback(){
      if(this.initialized)return;
      this.initialized=true;
      const video=this.querySelector('video'),button=this.querySelector('button');
      if(!video||!button)return;
      button.hidden=false;
      button.addEventListener('click',()=>{video.play().then(()=>{button.hidden=true;video.focus();}).catch(()=>{button.hidden=false;});});
      video.addEventListener('play',()=>{button.hidden=true;});
      video.addEventListener('ended',()=>{button.hidden=false;});
    }
  });
}
