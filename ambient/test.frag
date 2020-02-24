#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_mouse;

void main(){
    vec3 color = vec3(1.0, sin(u_mouse), sin(u_time));
    gl_FragColor = vec4(color,1.);  
}