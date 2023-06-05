document.addEventListener('DOMContentLoaded', function () {
  // Comprobación de compatibilidad de las APIs necesarias
  if (window.File && window.FileReader && window.FileList) {
    console.log('Todas las APIs son soportadas');
  } else {
    alert('La API de File no es soportada en este navegador.');
    return;
  }

  const fileSelector = document.getElementById('fileSelector');
  const playPauseButton = document.getElementById('playPauseButton');
  const volumeUpButton = document.getElementById('volumeUpButton');
  const volumeDownButton = document.getElementById('volumeDownButton');
  const selectAnotherVideoButton = document.getElementById('select-another-video');
  const videoFileInput = document.getElementById('videoFileInput');
  const videoPlayer = document.getElementById('videoPlayer');
  const loadingMessage = document.getElementById('loadingMessage');

  //Abrir explorador de archivos para seleccionar video ante el evento clic
  fileSelector.addEventListener('click', function () {
    videoFileInput.click();
  });

  // Cambiar de screen al elegir un archivo de video válido
  videoFileInput.addEventListener('change', function () {
    const file = videoFileInput.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        displayLoadingMessage();
        const fileURL = URL.createObjectURL(file);
        setTimeout(() => {
          videoPlayer.src = fileURL;
          loadingMessage.style.display = 'none';
          document.getElementById('screen1').style.display = 'none';
          document.getElementById('screen2').style.display = 'block';
        }, 2000);
      } else {
        alert('Error: ¡Selecciona un archivo de video válido!');
      }
    }
  });

  // Función para mostrar el mensaje de carga
  function displayLoadingMessage() {
    loadingMessage.style.display = 'block';
  }

  // Función para reproducir/pausa
  function togglePlayback() {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }

  // Función para subir o bajar el volumen
  function adjustVolume(direction) {
    if (direction === '+') {
      videoPlayer.volume += 0.2;
    } else if (direction === '-') {
      videoPlayer.volume -= 0.2;
    }
  }
  
  //LLamar las funciones correspondienetes ante el evento clic de cada botón
  playPauseButton.addEventListener('click', function () {
    togglePlayback();
  });

  volumeUpButton.addEventListener('click', function () {
    adjustVolume('+');
  });

  volumeDownButton.addEventListener('click', function () {
    adjustVolume('-');
  });

  // Función para seleccionar otro video
  selectAnotherVideoButton.addEventListener('click', function () {
    videoPlayer.src = '';
    videoFileInput.value = '';
    document.getElementById('screen1').style.display = 'block';
    document.getElementById('screen2').style.display = 'none';
  });
});