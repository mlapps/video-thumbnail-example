import { Lightning, Img, Utils, VideoPlayer } from '@lightningjs/sdk'

export default class MediaThumbnail extends Lightning.Component {
  static get width() {
    return 533
  }

  static get height() {
    return 300
  }

  static _template() {
    return {
      ImageThumbnail: {
        mount: 0.5,
        w: w => w,
        h: h => h,
        x: w => w / 2,
        y: h => h / 2,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: [20, 20, 20, 20],
        },
      },
      Border: {
        visible: false,
        mount: 0.5,
        x: w => w / 2,
        y: h => h / 2,
        texture: Lightning.Tools.getRoundRect(533, 300, 20, 8, 0xffffff00, false, null),
      },
    }
  }

  get ImageThumbnail() {
    return this.tag('ImageThumbnail')
  }

  get Border() {
    return this.tag('Border')
  }

  _init() {
    this.ImageThumbnail.texture = Img(Utils.asset('images/thumb.png')).exact(this.w, this.h)
  }

  _switchToImageThumbnail() {
    this.ImageThumbnail.alpha = 1
    this.unpunchHole && typeof this.unpunchHole === 'function' && this.unpunchHole()
  }

  _switchToVideoThumbnail() {
    this.ImageThumbnail.setSmooth('alpha', 0)
    this.punchHole && typeof this.punchHole === 'function' && this.punchHole(this)
  }

  _focus() {
    this.Border.visible = true
    if (this.punchHole && typeof this.punchHole === 'function') {
      VideoPlayer.consumer(this)
      VideoPlayer.size(this.w, this.h)
      VideoPlayer.open(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      )
    }
  }

  _unfocus() {
    this.Border.visible = false
    VideoPlayer.close()
    this._switchToImageThumbnail()
  }

  $videoPlayerPlaying() {
    const [x, y] = this.core.getCornerPoints()
    VideoPlayer.position(y, x)
    this._switchToVideoThumbnail()
  }

  $videoPlayerEnded() {
    this._switchToImageThumbnail()
  }

  // for local development, the browser might not start the video automatically.
  _handleEnter() {
    VideoPlayer.playPause()
  }
}
