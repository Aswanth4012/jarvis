const btn = document.querySelector('.btn');
const content = document.querySelector('.content');

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);
    
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour > 0 && hour < 12){
        speak("Good Morning..");
    }else if(hour > 12 && hour < 17){
        speak("Good after noon");
    }else {
        speak("Good Eavning");
    }
}
window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message){
    if(message.includes('hey') || message.includes('hi') || message.includes('hello')){
        speak("Hello sir, how may i help you?");
    }else if(message.includes('open google')){
        window.open("https://google.com","_blank");
        speak("opening google...");
    }else if(message.includes('open facebook')){
        window.open("https://facebook.com","_blank");
        speak("opening facebook...");
    }else if(message.includes('who are you') || message.includes('your name') || message.includes('about you')){
        speak("I am JARVIS version 1.1, developed by Aswanth");
    }else if(message.includes('open youtube')){
        window.open("https://youtube.com","_blank");
        speak("opening youtube...");
    }else if(message.includes('open instagram')){
        window.open("https://instagram.com","_blank");
        speak("opening instagram...");
    }else if(message.includes('what is') || message.includes('who is') || message.includes('where is')){
        window.open(`https://www.google.com/search?q=${message.replace(" ","+")}`, "_blank");
        const finalText = "This is what i found on internet regarding" + message;
        speak(finalText);
    }else if(message.includes('time')){
        var time = new Date().toLocaleString(undefined, {hour:"numeric", minute:"numeric"});
        const finalTime = time;
        speak(finalTime);
    }else if(message.includes('date')){
        var date = new Date().toLocaleString(undefined, {month:"short", day:"numeric"});
        const finalDate = date;
        speak(finalDate);
    }else if(message.includes('dont leave me buddy')){
        speak('Trust me, I am always here for you');
    }else if(message.includes('thank you')){
        speak("you are always welcome");
    }else{
        speak('sorry, im just a beta version with limited skills, but i will improve on future.');
    }
        
}