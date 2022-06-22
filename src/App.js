/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'
import MediaThumbnail from './MediaThumbnail'
import { List } from '@lightningjs/ui'

export default class App extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset('images/background.jpg'),
      },
      Thumbnails: {
        type: List,
        spacing: 15,
        w: 1720,
        y: 500,
        x: 100,
      },
      Copyright: {
        y: 1050,
        x: 1550,
        text: {
          text: 'Blender Foundation | www.blender.org',
          fontSize: 20,
        },
      },
    }
  }

  get Thumbnails() {
    return this.tag('Thumbnails')
  }

  get Background() {
    return this.tag('Background')
  }

  _init() {
    const thumbnail = {
      type: MediaThumbnail,
      punchHole: this.getPunchHole(),
      unpunchHole: this.getUnpunchHole(),
    }

    this.Thumbnails.add(Array(5).fill(thumbnail))
  }

  getPunchHole() {
    return thumb => {
      // get absolute coordinates of the element
      const [x, y] = thumb.core.getCornerPoints()
      this.Background.shader = {
        type: Lightning.shaders.Hole,
        x: x + 2,
        y: y + 2,
        w: thumb.w - 4,
        h: thumb.h - 4,
        radius: 20,
      }
    }
  }

  getUnpunchHole() {
    return () => {
      this.Background.shader = {}
    }
  }

  _getFocused() {
    return this.Thumbnails
  }
}
