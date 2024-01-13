import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Scroll-Animation-Logic';
  frameCount = 148

  @ViewChild('myCanvas') canvas!: ElementRef;

  currentFrame = (index: any) => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
    )

  preloadImages = () => {
      for (let i = 1; i < this.frameCount; i++) {
        const img = new Image();
        img.src = this.currentFrame(i);
      }
  };

  ngAfterViewInit() {
    this.preloadImages();
    const html = document.documentElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas?.getContext("2d");


    canvas.height = 770;
    canvas.width = 1158;
    const img = new Image();
    img.src = this.currentFrame(1);
    img.onload = function() {
      context.drawImage(img, 0, 0);
    }

    const updateImage = (index: any) => {
      // console.log(index)
      img.src = this.currentFrame(index);
      context.drawImage(img, 0, 0);
    }

    window.addEventListener('scroll', () => {
        // console.log("Hello")
        // const scrollTop = html?.getElementsByTagName('body')?.item(0)?.scrollTop;
        const scrollTop = html.scrollTop;
        console.log("ScrollTop", scrollTop);

        const maxScrollTop = html.scrollHeight - window.innerHeight;
        console.log("Max Scroll Top", maxScrollTop)

        const scrollFraction = (scrollTop || 0) / maxScrollTop;
        console.log("scroll Fraction", scrollFraction)

        const frameIndex = Math.min(this.frameCount - 1,Math.floor(scrollFraction * this.frameCount));
        console.log("FrameIndx",frameIndex)

        requestAnimationFrame(() => updateImage(frameIndex + 1))
    });
  }
}
