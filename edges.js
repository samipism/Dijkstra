class Edges {
    constructor(src, dest, weight) {
        this.src = src
        this.dest = dest
        this.weight = weight
        this.slope = Math.atan((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) / (parseFloat(this.dest.getX()) - parseFloat(this.src.getX())))
        this.midX = 0.5 * (parseFloat(this.src.getX()) + parseFloat(this.dest.getX()))
        this.midY = 0.5 * (parseFloat(this.src.getY()) + parseFloat(this.dest.getY()))
        this.span1X = (parseFloat(this.src.getX()) - this.midX)
        this.span1Y = (parseFloat(this.src.getY()) - this.midY)
        this.length = Math.sqrt(this.span1X * this.span1X + this.span1Y * this.span1Y)
        this.spanX = 10 * (this.span1X / this.length)
        this.spanY = 10 * (this.span1Y / this.length)
    }

    display() {
        strokeWeight(4)
        // console.log(12.5 * Math.sin(this.slope), 12.5 * Math.cos(this.slope), this.slope * (180 / Math.PI))
        if (this.slope < 0) {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) > 0)
                this.slope = Math.PI + this.slope
        }
        else {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) < 0)
                this.slope = Math.PI + this.slope
        }


        line(parseFloat(this.src.getX()) + 12.5 * Math.cos(this.slope), parseFloat(this.src.getY()) + 12.5 * Math.sin(this.slope), parseFloat(this.dest.getX()) - 12.5 * Math.cos(this.slope), parseFloat(this.dest.getY()) - 12.5 * Math.sin(this.slope))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(Math.PI / 4) - this.spanY * Math.sin(Math.PI / 4)), this.midY + (this.spanX * Math.sin(Math.PI / 4) + this.spanY * Math.cos(Math.PI / 4)))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(-Math.PI / 4) - this.spanY * Math.sin(-Math.PI / 4)), this.midY + (this.spanX * Math.sin(-Math.PI / 4) + this.spanY * Math.cos(-Math.PI / 4)))
    }
}