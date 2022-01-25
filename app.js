const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    songs: [
        {
            name: 'Moonlight',
            singer: 'Agust D',
            path: 'music/01. Moonlight.mp3',
            image: 'https://api.time.com/wp-content/uploads/2020/05/D-2-Cover_fin.jpg'
        },
        {
            name: 'Daechwita',
            singer: 'Agust D',
            path: 'music/02. Daechwita.mp3',
            image: 'https://6.viki.io/image/a7dd269235e8431fb067c044539e83b7.jpeg?s=900x600&e=t'
        },
        {
            name: 'What Do You Think?',
            singer: 'Agust D',
            path: 'music/03. What do you think.mp3',
            image: 'https://kgasa.com/wp-content/uploads/2020/05/Agust-D-D-2.jpg'
        },
        {
            name: 'Strange',
            singer: 'Agust D ft. RM',
            path: 'music/04. Strange (Ft. RM).mp3',
            image: 'https://i.pinimg.com/474x/ff/dc/e7/ffdce7c9e79c3008d42271e3e4029937--min-suga-suga-agustd.jpg'
        },
        {
            name: '28',
            singer: 'Agust D ft. NiiHWA',
            path: 'music/05. 28 (Ft. NiiHWA).mp3',
            image: 'https://i.pinimg.com/474x/48/b3/cb/48b3cbfe66ce8a04fddc65f30040bf60.jpg'
        },
        {
            name: 'Burn It',
            singer: 'Agust D ft. MAX',
            path: 'music/06. Burn It (Ft. MAX).mp3',
            image: 'https://res.cloudinary.com/teepublic/image/private/s--opSVuvO2--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1590286781/production/designs/10520777_0.jpg'
        },
        {
            name: 'People',
            singer: 'Agust D',
            path: 'music/07. People.mp3',
            image: 'https://i.pinimg.com/564x/0d/c6/90/0dc6906fadd49f109abea6589ce61099.jpg'
        },
        {
            name: 'Honsool',
            singer: 'Agust D',
            path: 'music/08. Honsool.mp3',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/166e992b-4534-4bd8-bb41-3be395f82cde/ddej9j0-ca57ee58-4a5a-48e5-952c-5d66cf44d351.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2NmU5OTJiLTQ1MzQtNGJkOC1iYjQxLTNiZTM5NWY4MmNkZVwvZGRlajlqMC1jYTU3ZWU1OC00YTVhLTQ4ZTUtOTUyYy01ZDY2Y2Y0NGQzNTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.KAi-Eol0FUaPDn4vYbPuKLCLLD_wkiRrCDuR4LD63fc'
        },
        {
            name: 'Interlude: Set Me Free',
            singer: 'Agust D',
            path: 'music/09. Interlude _ Set me free.mp3',
            image: 'https://imgx.sonora.id/crop/0x0:0x0/x/photo/2020/05/22/1626585674.jpg'
        },
        {
            name: 'Dear My Friend',
            singer: 'Agust D ft. Kim Jong-wan',
            path: 'music/10. Dear my friend (feat. Kim Jong Wan of NELL).mp3',
            image: 'https://i.pinimg.com/564x/8e/aa/48/8eaa48b29126c2ff7eebcfb2b9a9f5cf.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? "active": ""}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>

                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>

                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        const cdThumbAnimate = cdThumb.animate([{transform: "rotate(360deg)"}], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function() {
            if (_this.isPlaying) audio.pause()
            else audio.play()
        }

        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add("playing")
            cdThumbAnimate.play()
        }

        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove("playing")
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function(e) {
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }

        nextBtn.onclick = function() {
            if (_this.isRandom) _this.playRandomSong()
            else _this.nextSong()

            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        prevBtn.onclick = function() {
            if (_this.isRandom) _this.playRandomSong()
            else _this.prevSong()

            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        randomBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig("isRepeat", _this.isRepeat)
            repeatBtn.classList.toggle("active", _this.isRepeat)
        }
        
        audio.opended = function() {
            if (_this.isRepeat) audio.play()
            else nextBtn.click()
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest(".song:not(.active)")

            if (songNode || e.target.closest(".option")) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                if (e.target.closest(".option")) {}
            }
        }
        },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "'nearest"
            })
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) this.currentIndex = 0
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let newIndex
        do newIndex = Math.floor(Math.random() * this.songs.length)
        while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        randomBtn.classList.toggle("active", this.isRandom)
        repeatBtn.classList.toggle("active", this.isRepeat)
    }
}

app.start()