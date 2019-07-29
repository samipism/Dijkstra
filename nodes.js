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
        fill(this.color)
        ellipse(this.x, this.y, 25, 25)
        fill('#fc0303')
        text(this.val, this.x, this.y)
    }
    isPressed() {
        let distance = dist(mouseX, mouseY, this.x, this.y)
        if (distance < 12.5)
            return true;
        else
            return false;
    }
    showValue() {
        return this.val;
    }
}