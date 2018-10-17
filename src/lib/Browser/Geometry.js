// Devuelve true si la box v y d estan alejadas un maximo de offset entre si.
// Si offset es 0, significa que se intersectan
export function withinRange(d,v,offset=0)
{
    let distances=[
        v.left - d.right, // El div demasiado a la izquierda.
        d.left-v.right, // Div demasiado a la derecha.
        v.top - d.bottom, // Div demasiado arriba.
        d.top - v.bottom // Div demasiado abajo.
    ];
    // Si cualquiera de los anteriores es positivo, no hay interseccion.
    let acc=0;
    for(let k=0;k<4;k++)
    {
        if(distances[k]>0)
            acc+=distances[k];
    }
    if(acc>0 && (offset==0 || offset < acc))
        return false;
    return true;
}

// v es el container, d es el contenido
export function isSquareContained(d,v)
{
    return d.left >= v.left && d.right <=v.right && d.top >=v.top && d.bottom <=v.bottom;
}

export function getIntersection(d,v)
{
    if(!withinRange(d,v,0))
        return null;
    let a={
        right:Math.min(d.right,v.right),
        left:Math.max(d.left,v.left),
        top:Math.max(d.top,v.top),
        bottom:Math.min(d.bottom,v.bottom)
    };
    return (a.right<0 || a.left<0 || a.top<0 || a.bottom<0)?null:a;
}
export function getArea(d)
{
    return (d.right-d.left)*(d.bottom-d.top);
}