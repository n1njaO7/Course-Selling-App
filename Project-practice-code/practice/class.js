class Rectangle
{      
    constructor(width , height , color)
    {
        this.width=width;
        this.height=height;
        this.color=color;
    }
    area()
    {
        const area = this.width*this.height;
        return area;
    }
    paint()
    {
        console.log("the paint is Red");
    }
}
const rect = new Rectangle(2, 4);
const area = rect.area();
rect.paint()
console.log(area);

