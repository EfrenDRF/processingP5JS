/*
 * Author: Efren Del Real Frias
 * Date: August 16th 2020
 * Software tool: p5*Js
 * 
 * Description: Class Harmonic definition.
 * version: 1.0.0 Works only with bn coefficient (odd simetry)
 * 
 */
class Harmonic
{
    constructor(pHarmonicNumber)
    {
        this.color = [random(0,255),random(0,255),random(0,255)];
        this.harmonic = pHarmonicNumber;
        this.amplitude = 0;
        this.x1Position = 0;
        this.y1Position = 0;

        this.x2Position = 0;
        this.y2Position = 0;
    }
    
    rotate(pAmplitude, pAngle, xPosition, yPosition)
    {
        this.amplitude = this.bn_coefficient(pAmplitude);
        this.x1Position = xPosition;
        this.y1Position = yPosition;

        this.x2Position = (this.amplitude*cos(pAngle)) + xPosition;
        this.y2Position = (this.amplitude*sin(pAngle)) + yPosition;
    }

    show()
    {
        stroke(this.color);
        noFill();
        ellipse(this.x1Position,this.y1Position,2*this.amplitude);
        line(this.x1Position, this.y1Position, this.x2Position, this.y2Position);
    }

    getXFinalPosition()
    {
        return this.x2Position;
    }

    getYFinalPosition()
    {
        return this.y2Position;
    }
    getHarmonicNumber()
    {
        return this.harmonic;
    }

   bn_coefficient(pAmplitude)
   {
       /* Sawtooth */
       let retCoefficient = 0.0;
       let sign;

        sign = (this.harmonic % 2) == 0? 1:-1;
        retCoefficient= sign*(2*pAmplitude/(this.harmonic*PI));

       return retCoefficient;
   }


}