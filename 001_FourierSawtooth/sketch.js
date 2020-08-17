/*
 * Author: Efren Del Real Frias
 * Date: August 16th 2020
 * Software tool: p5*Js
 * 
 * Description: Graphs a periodic signal, throught Fourier seriers.
 *              Use slider bar to modify in running time the signal's properties 
 *              like amplitude and frecuency.
 *              Use a slider bar to modify the number of harmonics to display
 * 
 */

 /* Define local variables ------------------------------------------------------*/

let angle = 0;
let time = 0;

let sliderAmplitude;
let sliderFrecuency;
let sliderHarmonic;

let startPlane;
let harmonicCounter;

let fourierSerie = []
let signalBuffer =[]




function setup() {
    createCanvas(1000, 500);
    background(200);

    sliderAmplitude = slider = createSlider(5, 200, 200, 5);
    sliderAmplitude.position(10, 520);
    sliderAmplitude.style('width', '150px');

    sliderFrecuency = slider = createSlider(  0.01, 0.1, 0.1 , 0.01);
    sliderFrecuency.position(10, 550);
    sliderFrecuency.style('width', '150px');


    harmonicCounter = 1;
    sliderHarmonic = slider = createSlider(  1, 100, harmonicCounter, 1);
    sliderHarmonic.position(10, 570);
    sliderHarmonic.style('width', '150px');


    let fundamentalHarmonic = new Harmonic(1);
    fourierSerie.push(fundamentalHarmonic);
}

function draw() {

  background(200);
  angleMode(DEGREES); 

  
  angle = TWO_PI * sliderFrecuency.value() * time;

  fourierSerie[0].rotate(sliderAmplitude.value(), angle, sliderAmplitude.value(),height/2);
  fourierSerie[0].show();
  
  /*Create new harmonics to plot*******************************************************/
  for(let index = 1; index < sliderHarmonic.value(); index++)
  {
    if(sliderHarmonic.value() > harmonicCounter)
    {
      harmonicCounter++;
      let harmonic = new Harmonic(harmonicCounter);
      fourierSerie.push(harmonic);
    }

    fourierSerie[index].rotate(
                              sliderAmplitude.value(), 
                              angle * fourierSerie[index].getHarmonicNumber(),
                              fourierSerie[index-1].getXFinalPosition(),
                              fourierSerie[index-1].getYFinalPosition()
                              );

    fourierSerie[index].show();
  }

  /* Update the origin point of the x axis */
  startPlane = 2.8 *sliderAmplitude.value();


  /* Plots a horizontal white line that point to the last current harmonic ***********/
  stroke(255);
  line(
    fourierSerie[(harmonicCounter-1)].getXFinalPosition(), 
    fourierSerie[(harmonicCounter-1)].getYFinalPosition(), 
    startPlane, 
    fourierSerie[(harmonicCounter-1)].getYFinalPosition()
  );

  
  /* Plots tha variables axes ********************************************************/
  stroke(0);
  /* Horizontal axis */
  line(startPlane, height/2,width,height/2);
  /* Vertical axis */
  line(startPlane, height/2 + sliderAmplitude.value(), startPlane, height/2 - sliderAmplitude.value());


  /* Plots the signal *************************************************************/
  strokeWeight(2);

  /* Adds the Y final position of the last harmonic in the first buffer element */
  signalBuffer.unshift(fourierSerie[(harmonicCounter-1)].getYFinalPosition());

  for(let index =(signalBuffer.length -1); index >= 0;  index--)
  {
    point(startPlane + index, signalBuffer[index]);

    if((startPlane + index) > width)
    {
      /* Remove the oldest signal value from the buffer */
      signalBuffer.pop();
    }
  }


  /* Removes harmonics that the user will not want to plot */
  if (sliderHarmonic.value() < harmonicCounter)
  {
    do{
      harmonicCounter--;
      fourierSerie.pop();
    }while(sliderHarmonic.value() < harmonicCounter);
  }
  

  /*  */
  time++;
}
