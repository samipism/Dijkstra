class Nodes {
    constructor(x, y, val, color) {
        this.x = x;
        this.y = y;
        this.val = val;
        this.color = color;
    }
    getX() {
        return this.x
    }
    getY() {
        return this.y
    }
    display() {
        strokeWeight(1)
        stroke(1, 1, 1);
        fill(this.color)
        ellipse(this.x, this.y, 40, 40)
        fill('#fc0303')
        textSize(15)
        text(this.val, this.x, this.y)
    }
    highlight() {
        noFill()
        strokeWeight(1)
        ellipse(this.x, this.y, 50, 50)
    }
    isPressed() {
        let distance = dist(mouseX, mouseY, this.x, this.y)
        if (distance < 20)
            return true;
        else
            return false;
    }
    showValue() {
        return this.val;
    }
}