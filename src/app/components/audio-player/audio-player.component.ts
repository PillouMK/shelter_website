import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Card} from 'primeng/card';
import { CommonModule } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';
import {ProgressBar} from 'primeng/progressbar';
import {formatTimeMMSS, formatToFrench} from '../../utils/datetime.utils';
import {Button} from 'primeng/button';
import {Avatar} from 'primeng/avatar';
import {getAvatarImage} from '../../utils/avatar.utils';

@Component({
  selector: 'app-audio-player',
  imports: [
    Card, CommonModule, ProgressBar, Button, Avatar
  ],
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waveform') waveformElement!: ElementRef;
  @Input({required: false}) orientation: string = 'vertical'; // vertical | horizontal
  @Input({required: false}) avatar: number = 0;
  @Input({required: false}) audio_title: string = "Titre de l'audio";
  @Input({required: true}) audio_url!: string;

  wavesurfer: WaveSurfer | null = null;
  isLoading = true;
  loadingProgress = 0;

  ngAfterViewInit() {
    this.initWaveSurfer();
  }

  private async initWaveSurfer() {
    const computedStyle = getComputedStyle(document.documentElement);
    const waveColor = computedStyle.getPropertyValue('--color-tertiary-100').trim();
    const progressColor = computedStyle.getPropertyValue('--color-primary').trim();

    this.wavesurfer = WaveSurfer.create({
      container: this.waveformElement.nativeElement,
      waveColor: waveColor,
      progressColor: progressColor,
      height: 60,
      cursorWidth: 0,
      cursorColor: '#333',
      autoScroll: true,
      normalize: true,
      barWidth: 3,
      barGap: 3,
      barRadius: 10,
    });

    this.wavesurfer.on('loading', (percent) => {
      this.isLoading = true;
      this.loadingProgress = percent;
    });

    this.wavesurfer.on('ready', () => {
      this.isLoading = false;
    });

    await this.wavesurfer.load(this.audio_url);
  }

  ngOnDestroy() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

  skip(second: number) {
    this.wavesurfer?.setTime(this.wavesurfer?.getCurrentTime() + second);
  }

  back(second: number) {
    this.wavesurfer?.setTime(this.wavesurfer?.getCurrentTime() - second);
  }

  protected readonly formatTimeMMSS = formatTimeMMSS;
  protected readonly getAvatarImage = getAvatarImage;
  protected readonly formatToFrench = formatToFrench;
}
