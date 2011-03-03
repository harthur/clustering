//     The contents of this file are subject to the Mozilla Public License
//     Version 1.1 (the "License"); you may not use file except in
//     compliance with the License. You may obtain a copy of the License at
//     http://www.mozilla.org/MPL/
//
//     Software distributed under the License is distributed on an "AS IS"
//     basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
//     License for the specific language governing rights and limitations
//     under the License.
//
//     The Original Code is SHIVDEEP KRISHNA
//
//     The Initial Developer of the Original Code is SHIVDEEP KRISHNA.
//     Portions created by SHIVDEEP KRISHNA are Copyright (C) OF SHIVDEEP KRISHNA.
//     All Rights Reserved.
//
//     Contributor(s): SHIVDEEP KRISHNA, ANITA

rnd = Math.pow(10,3);


function convertRGBtoHEX(R,G,B) {
	var hexCode = toHexCode(R)+toHexCode(G)+toHexCode(B);
	return hexCode;
}

function convertRGBtoGS(R, G, B) {

	var gray = Math.round(0.3 * R + 0.59 * G + 0.11 * B);
	var gs = toHexCode(gray);
	gs = gs+""+gs+""+gs;
	return gs;
}

function convertRGBtoHSV(R, G, B) {

	R /= 255;
	G /= 255;
	B /= 255;

	var maxCol = Math.max(Math.max(R,G),B);
	var minCol = Math.min(Math.min(R,G),B);

	var H = -1;
	var S = 0;
	var V = maxCol;
	var D = maxCol - minCol;
	  
	if(D!=0) {
		S = D/V;
		
		if(R==V) { 
			H = (G-B)/D;
		}
		else if(G==V) {
			H = 2 + (B-R)/D;
		}
		else { 
			H = 4 + (R-G)/D;
		}

		H = H * 60;
		if(H<0) { 
			H+=360;
		}
	}
	
	H = Math.round(H);
	S = Math.round(rnd * S * 100)/rnd;
	V = Math.round(rnd * V * 100)/rnd;
	
	return new Array(H,S,V);
}

function convertRGBtoHSL(R, G, B) {

	R /= 255;
	G /= 255;
	B /= 255;
	
	var maxCol = Math.max(Math.max(R,G),B);
	var minCol = Math.min(Math.min(R,G),B);
	var D = maxCol - minCol;
	
	var H = 0;
	var S = 0;
	var L = (maxCol + minCol)/2;

	if(D>0) {
		if(L<0.5) {
			S = D/(maxCol+minCol);
		}
		else {
			S = D/(2-maxCol-minCol);
		}

		if(maxCol==R) {
			H = (G-B)/D;
		}
		else if(maxCol==G) {
			H = 2 + (B-R)/D;
		}
		else {
			H = 4 + (R-G)/D;
		}

		H *= 60;
	
		if(H<0) {
			H += 360;
		}
	}
	
	H = Math.round(H);
	S = Math.round(rnd * S * 100)/rnd;
	L = Math.round(rnd * L * 100)/rnd;
	
	return new Array(H,S,L);
	
}

function convertRGBtoHSI(R, G, B) {

	R /= 255;
	G /= 255;
	B /= 255;
	
	var maxCol = Math.max(Math.max(R,G),B);
	var minCol = Math.min(Math.min(R,G),B);
	var D = maxCol - minCol;
	
	var H = -1;
	var S = 0;
	var I = maxCol;
	var D = maxCol - minCol;
	  
	if(D!=0) {
		S = D/maxCol;
		
		if(R==maxCol) { 
			H = (G-B)/D;
		}
		else if(G==maxCol) {
			H = 2 + (B-R)/D;
		}
		else { 
			H = 4 + (R-G)/D;
		}

		H = H * 60;
		if(H<0) { 
			H+=360;
		}
	}
	
	H = Math.round(H);
	S = Math.round(rnd * S * 100)/rnd;
	I = Math.round(rnd * I * 100)/rnd;
	
	return new Array(H,S,I);

}

function convertRGBtoHWB(R, G, B) {

	R /= 255;
	G /= 255;
	B /= 255;
	
	var V = Math.max(Math.max(R,G),B);
	var W = Math.min(Math.min(R,G),B);
	
	var B = 1 - V;
	var H = 0;
	var F = 0;
	var I = 0;

	if(R==W) {
		F = G - B;
		I = 3;
	}
	else if(G==W) {
		F = B - R;
		I = 5;
	}
	else {
		F = R - G;
		I = 1;
	}

 	H = I - F /(V - W);
	
	H = Math.round(rnd * H * 100)/rnd;
	W = Math.round(rnd * W * 100)/rnd;
	B = Math.round(rnd * B * 100)/rnd;
	
	return new Array(H,W,B);
}

function convertRGBtoHLAB(R, G, B) {

	var xyz = convertRGBtoXYZ(R,G,B);
	
	var X = xyz[0];
	var Y = xyz[1];
	var Z = xyz[2];

	var L = 10*Math.sqrt(Y);
	var A = 17.5*(((1.02*X)-Y)/Math.sqrt(Y));
	var B = 7*((Y-(0.847*Z))/Math.sqrt(Y));

	L = Math.round(rnd * L)/rnd;
	A = Math.round(rnd * A)/rnd;
	B = Math.round(rnd * B)/rnd;
	
	return new Array(L,A,B);
}

function convertRGBtoLAB(R, G, B) {
	
	var xyz = convertRGBtoXYZ(R,G,B);
	
	var X = xyz[0];
	var Y = xyz[1];
	var Z = xyz[2];
	
	X /= 95.047;
	Y /= 100;
	Z /= 108.883;

	if(X>0.008856)
		X = Math.pow(X,1/3);
	else
		X = (7.787*X)+(16/116);

	if(Y>0.008856)
		Y = Math.pow(Y,1/3);
	else
		Y = (7.787*Y)+(16/116);
	
	if(Z>0.008856)
		Z = Math.pow(Z,1/3);
	else
		Z = (7.787*Z)+(16/116);

	var L = (116*Y)-16;
	var A = 500*(X-Y);
	var B = 200*(Y-Z);
	return [L, A, B];

	L = Math.round(rnd * L)/rnd;
	A = Math.round(rnd * A)/rnd;
	B = Math.round(rnd * B)/rnd;
	
	return new Array(L,A,B);
}

function convertRGBtoLCH(R, G, B) {

	var lab = convertRGBtoLAB(R,G,B);
	
	var L = lab[0];
	var A = lab[1];
	var B = lab[2];
	
	var H = Math.atan2(B,A);

	if(H>0)
		H = H * 57.2728;
	else
		H = 360 - (Math.abs(H) * 57.2728);

	var C = Math.sqrt( Math.pow(A,2) + Math.pow(B,2) )
    return [L, C, H];

	L = Math.round(rnd * L)/rnd;
	C = Math.round(rnd * C)/rnd;
	H = Math.round(rnd * H)/rnd;
	
	return new Array(L,C,H);
}

function convertRGBtoLUV(R, G, B) {

	var xyz = convertRGBtoXYZ(R,G,B);
	
	var L = 0;
	var U = 0;
	var V = 0;
	
	var X = xyz[0];
	var Y = xyz[1];
	var Z = xyz[2];

	U = (4 * X ) / ( X + ( 15 * Y ) + ( 3 * Z ) );
	V = (9 * Y ) / ( X + ( 15 * Y ) + ( 3 * Z ) );

	Y = Y / 100;

	if( Y > 0.008856 )
		Y = Math.pow(Y,(1/3));
	else
		Y = (7.787*Y)+(16/116);

	L = ( 116 * Y ) - 16;
	U = 13 * L * ( U - 0.1978398 );
	V = 13 * L * ( V - 0.4683363 );

	L = Math.round(rnd * L)/rnd;
	U = Math.round(rnd * U)/rnd;
	V = Math.round(rnd * V)/rnd;
	
	return new Array(L,U,V);
}

function convertRGBtoYUV(R, G, B) {
	
	R/= 255;
	G/= 255;
	B/= 255;
	
	var Y = (0.299*R)+(0.587*G)+(0.114*B);
	var U = 0.493*(B - Y);
	var V = 0.877*(R - Y)
	
	Y = Math.round(rnd * Y * 100)/rnd;
	U = Math.round(rnd * U * 100)/rnd;
	V = Math.round(rnd * V * 100)/rnd;
	
	return new Array(Y,U,V);
}

function convertRGBtoYIC(R, G, B) {

	R/= 255;
	G/= 255;
	B/= 255;
	
	var Y = (0.299*R)+(0.587*G)+(0.114*B);
	var I = (0.596*R)-(0.275*G)-(0.321*B);
	var Q = (0.212*R)-(0.523*G)+(0.311*B);
	var C = I + Q;

	Y = Math.round(rnd * Y * 100)/rnd;
	I = Math.round(rnd * I * 100)/rnd;
	C = Math.round(rnd * C * 100)/rnd;
	
	return new Array(Y,I,C);
}

function convertRGBtoYCC(R, G, B) {

	R/= 255;
	G/= 255;
	B/= 255;

	//Used by Kodak PhotoCD
	var Y  = (0.299*R) + (0.587*G) + (0.114*B);
	var Cr = (0.701*R) - (0.587*G) - (0.114*B);
	var Cb = (-0.299*R) - (0.587*G) + (0.886*B);

	// TODO: Incorporate this too
	// Used by TIFF and JPEG
	//var Y  = (0.2989*R) + (0.5866*G) + (0.1145*B);
	//var Cr = (0.5000*R) - (0.4183*G) - (0.0816*B);
	//var Cb = (-0.1687*R) - (0.3312*G) + (0.5000*B);
	
	Y  = Math.round(rnd * Y * 100)/rnd;
	Cr = Math.round(rnd * Cr * 100)/rnd;
	Cb = Math.round(rnd * Cb * 100)/rnd;
	
	return new Array(Y,Cr,Cb);
	
}

function convertRGBtoYIQ(R, G, B) {

	R/= 255;
	G/= 255;
	B/= 255;
	
	var Y = (0.299*R)+(0.587*G)+(0.114*B);
	var I = (0.596*R)-(0.275*G)-(0.321*B);
	var Q = (0.212*R)-(0.523*G)+(0.311*B);

	Y = Math.round(rnd * Y * 100)/rnd;
	I = Math.round(rnd * I * 100)/rnd;
	Q = Math.round(rnd * Q * 100)/rnd;
	
	return new Array(Y,I,Q);

}

function convertRGBtoYDD(R, G, B) {

	R/= 255;
	G/= 255;
	B/= 255;

	var Y  = (0.299*R)+(0.587*G)+(0.114*B);
	var Db = (-0.450*R)-(0.883*G)+(1.333*B);
	var Dr = (-1.333*R)+(1.116*G)+(0.217*B);

	Y  = Math.round(rnd * Y * 100)/rnd;
	Db = Math.round(rnd * Db * 100)/rnd;
	Dr = Math.round(rnd * Dr * 100)/rnd;
	
	return new Array(Y, Db, Dr);
}

function convertRGBtoXYZ(R, G, B) {

	R/= 255;
	G/= 255;
	B/= 255;

	R = R>0.04045?Math.pow(((R+0.055)/1.055),2.4):(R/12.92);
	G = G>0.04045?Math.pow(((G+0.055)/1.055),2.4):(G/12.92);
	B = B>0.04045?Math.pow(((B+0.055)/1.055),2.4):(B/12.92);
	
	var X = (R*0.4124)+(G*0.3576)+(B*0.1805);
	var Y = (R*0.2126)+(G*0.7152)+(B*0.0722);
	var Z = (R*0.0193)+(G*0.1192)+(B*0.9505);

    return [X * 100, Y *100, Z * 100];

	X = Math.round(rnd * X * 100)/rnd;
	Y = Math.round(rnd * Y * 100)/rnd;
	Z = Math.round(rnd * Z * 100)/rnd;
	
	return new Array(X,Y,Z);
}

function convertRGBtoCMY(R, G, B) {
	
	var C = ((255-R)/255)*100;
	var Y = ((255-B)/255)*100;
	var M = ((255-G)/255)*100;

	C = Math.round(rnd * C)/rnd;
	M = Math.round(rnd * M)/rnd;
	Y = Math.round(rnd * Y)/rnd;
	
	return new Array(C,M,Y);
}

function convertRGBtoCMYK(R, G, B) {
	
	R = R/255;
	G = G/255;
	B = B/255;
	
        var C = 0;
        var M = 0;
        var Y = 0;

	var K = Math.min(Math.min((1-R),1-G),(1-B));
	
	//TODO: add BLACK adjustment code here K = K * adjBlack
	
	if(K!=1) {
        	C = (1 - R - K)/(1 - K);
        	M = (1 - G - K)/(1 - K);
        	Y = (1 - B - K)/(1 - K);
        }
        else {
        	C = 0;
        	M = 0;
        	Y = 0;
        }

	C = Math.round(rnd * C)/rnd;
	M = Math.round(rnd * M)/rnd;
	Y = Math.round(rnd * Y)/rnd;
	K = Math.round(rnd * K)/rnd;
	
	return new Array(C,M,Y,K);
}

function convertRGBtoPMS(R, G, B) {
	var hex = convertRGBtoHEX(R,G,B);
	var pms = convertHEXtoPMS(hex);
	return pms;
}
