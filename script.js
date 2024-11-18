document.getElementById('convertBtn').addEventListener('click', () => {
    const svgFile = document.getElementById('svgFile').files[0];
    const format = document.getElementById('format').value;
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');
  
    if (!svgFile) {
      alert('Please upload an SVG file.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const svgContent = e.target.result;
      const img = new Image();
  
      img.onload = function () {
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
  
        const imageFormat = format === 'jpeg' ? 'image/jpeg' : 'image/png';
        const dataURL = canvas.toDataURL(imageFormat);
  
        downloadLink.href = dataURL;
        downloadLink.download = `converted-image.${format}`;
        downloadLink.style.display = 'inline-block';
        downloadLink.textContent = 'Download Image';
      };
  
      img.src = 'data:image/svg+xml;base64,' + btoa(svgContent);
    };
  
    reader.readAsText(svgFile);
  });
  