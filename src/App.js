//github seekh lo frndzz
import React,{useState,useRef,useEffect} from 'react'
import {Box,Stack,Typography,MenuItem,FormControl,Select} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Replay5Icon from '@mui/icons-material/Replay5';
import PauseIcon from '@mui/icons-material/Pause';
import Forward5Icon from '@mui/icons-material/Forward5';
import TuneIcon from '@mui/icons-material/Tune';
import ShortcutIcon from '@mui/icons-material/Shortcut';
const App = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

 
  const videoRef = useRef(null);
  
  //For toggling between pause and play
  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true)
      setVideoTime(videoRef.current.duration)
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false)
    }
  };
  //for fast forwarding 
   console.log(videoRef)
  const fastForward = () =>{
     videoRef.current.currentTime+=5
  }

  //for moving backward
  const backForward = () =>{
    videoRef.current.currentTime-=5
 }
 //for setting up playback speed
 useEffect(() => {
  videoRef.current.playbackRate = playbackRate;
}, [playbackRate]);

//handler function to monitor changes in plyack speed
const setPlayBack = (e) => {
 setPlaybackRate(e.target.value);
};
 const handleProgress = (e) => {

//We want to update it for every second
  window.setInterval(function (){
    if (isNaN(e.target.duration))   // duration is NotaNumber at Beginning.
    return;
    setCurrentTime(e.target.currentTime);

  setProgress((e.target.currentTime / e.target.duration) * 100);
  },1000)

 }
  return (
    <>
    <Box mt = {2} display = 'flex' justifyContent='center'
    >
      < Box display = 'flex' flexDirection='column' alignItems='center' width='fitContent' border = '50px bold' borderColor = '#11142d' >

    <video style = {{width:'100%',height:'80vh',backgroundColor:'transparent',zIndex:'20',borderRadius:'20px'}} ref = {videoRef}
    onProgress={handleProgress}
    
    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
   
       </video>
     
         <Box my ={2} sx={{ width: '70%' }} display = 'flex' alignItems='center' justifyContent='center'  >
         <Box  sx={{ width: '90%' }} mr = {1}>
       <LinearProgress variant="determinate" max="100" value={progress} />
      
    </Box>
       <Typography>
       {Math.floor(videoTime / 60) +
            ":" +
            ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </Typography>
         </Box>
     
      
     
      
    

       <Stack flexDirection='row' alignItems='center' gap = {6} mb = {1} justifyContent='space-between'>

        <Stack display = 'flex' flexDirection='column' justifyContent='center' >
          <TuneIcon />
          <Typography fontSize = '15px'>Settings</Typography>

        </Stack>

        <Stack display = 'flex' flexDirection='row' alignItems='center' gap = {1}>
          <Replay5Icon fontSize = 'large' sx = {{cursor:'pointer'}} onClick = {backForward}  />
          {playing?(<PauseIcon fontSize = 'large' sx = {{cursor:'pointer'}} onClick={() => videoHandler("pause")} />):<PlayCircleIcon fontSize = 'large' sx = {{cursor:'pointer'}} onClick={() => videoHandler("play")} />}
          
          <Forward5Icon fontSize = 'large' sx = {{cursor:'pointer'}} onClick = {fastForward}  />

        </Stack>
       
        <Stack flexDirection='row' gap = {1} >
        <Box backgroundColor = '#80818a' py = {1} px = {2} sx = {{borderRadius:'5px'}} display = 'flex' alignItems = 'center' >
        <Typography>
        {Math.floor(currentTime / 60) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </Typography>

        </Box>
        <FormControl size="small" >
  <Select
    value={playbackRate}
    
    onChange={setPlayBack}
  >
    <MenuItem value={0.5}>0.5</MenuItem>
    <MenuItem value={0.75}>0.75</MenuItem>
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={1.25}>1.25</MenuItem>
    <MenuItem value={1.5}>1.5</MenuItem>
  </Select>
</FormControl>


        </Stack>
        
        <Stack display = 'flex' flexDirection='column' justifyContent='center' >
        <ShortcutIcon />
          <Typography fontSize = '15px'>Shortcut</Typography>

        </Stack>
        
       
   </Stack>
    </Box>
   </Box>
    </>
  )
}

export default App