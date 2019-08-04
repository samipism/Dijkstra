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
        stroke(1, 1, 1);
        console.log("Slope : ", this.slope)
        let tempSlope = this.slope
        // console.log(20 * Math.sin(this.slope), 20 * Math.cos(this.slope), this.slope * (180 / Math.PI))
        if (this.slope < 0) {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) > 0)
                this.slope = Math.PI + this.slope
        }
        else {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) < 0)
                this.slope = Math.PI + this.slope
        }
        line(parseFloat(this.src.getX()) + 20 * Math.cos(this.slope), parseFloat(this.src.getY()) + 20 * Math.sin(this.slope), parseFloat(this.dest.getX()) - 20 * Math.cos(this.slope), parseFloat(this.dest.getY()) - 20 * Math.sin(this.slope))
        console.log("line size:", parseFloat(this.src.getX()) + 20 * Math.cos(this.slope), parseFloat(this.src.getY()) + 20 * Math.sin(this.slope), parseFloat(this.dest.getX()) - 20 * Math.cos(this.slope), parseFloat(this.dest.getY()) - 20 * Math.sin(this.slope))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(Math.PI / 4) - this.spanY * Math.sin(Math.PI / 4)), this.midY + (this.spanX * Math.sin(Math.PI / 4) + this.spanY * Math.cos(Math.PI / 4)))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(-Math.PI / 4) - this.spanY * Math.sin(-Math.PI / 4)), this.midY + (this.spanX * Math.sin(-Math.PI / 4) + this.spanY * Math.cos(-Math.PI / 4)))
        textSize(32)
        fill(0, 102, 153);
        strokeWeight(0)
        text(this.weight, this.midX - 20, this.midY - 20)
        this.slope = tempSlope
    }
    highlight() {
        strokeWeight(4)
        stroke(0, 102, 153);
        // console.log(20 * Math.sin(this.slope), 20 * Math.cos(this.slope), this.slope * (180 / Math.PI))
        if (this.slope < 0) {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) > 0)
                this.slope = Math.PI + this.slope
        }
        else {
            if ((parseFloat(this.dest.getY()) - parseFloat(this.src.getY())) < 0)
                this.slope = Math.PI + this.slope
        }
        line(parseFloat(this.src.getX()) + 20 * Math.cos(this.slope), parseFloat(this.src.getY()) + 20 * Math.sin(this.slope), parseFloat(this.dest.getX()) - 20 * Math.cos(this.slope), parseFloat(this.dest.getY()) - 20 * Math.sin(this.slope))
        console.log("line size:", parseFloat(this.src.getX()) + 20 * Math.cos(this.slope), parseFloat(this.src.getY()) + 20 * Math.sin(this.slope), parseFloat(this.dest.getX()) - 20 * Math.cos(this.slope), parseFloat(this.dest.getY()) - 20 * Math.sin(this.slope))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(Math.PI / 4) - this.spanY * Math.sin(Math.PI / 4)), this.midY + (this.spanX * Math.sin(Math.PI / 4) + this.spanY * Math.cos(Math.PI / 4)))
        line(this.midX, this.midY, this.midX + (this.spanX * Math.cos(-Math.PI / 4) - this.spanY * Math.sin(-Math.PI / 4)), this.midY + (this.spanX * Math.sin(-Math.PI / 4) + this.spanY * Math.cos(-Math.PI / 4)))
        textSize(32)
        fill(0, 102, 153);
        text(this.weight, this.midX - 20, this.midY - 20)
    }
    getSource() {
        return this.src
    }
    getDest() {
        return this.dest
    }
}