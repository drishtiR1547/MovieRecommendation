/* Adjustable script.js
   - Uses a local movieDB object keyed by mood.
   - Each mood contains 5 movie objects: {title, imdb, poster, trailer}
   - Poster fields use placeholder images; replace with real poster URLs or enable API fetch.
   - Recommendation count limited to 1..5 (dropdown).
   - Shuffle button randomizes results for the selected mood.
*/

/* ---------- Movie database (18 moods × 5 movies each) ---------- */
const movieDB = {
	happy: [
		{
			title: "Forrest Gump",
			imdb: 8.8,
			poster:
				"https://cdn.shopify.com/s/files/1/0747/3829/products/HP2406_e6732c54-9558-4c84-8fd8-855550e33d52_1024x1024.jpg?v=1515503637",
			trailer: "https://youtu.be/bLvqoHBptjg?si=BbFm_HNy9DyIYt66",
		},
		{
			title: "The Intouchables",
			imdb: 8.5,
			poster:
				"https://image.tmdb.org/t/p/original/f6ORXXQdIKHU3RvC6AC2lwAD6Mq.jpg",
			trailer: "https://youtu.be/2cGat1xI8G8?si=YSsdbTVnksghXAW6",
		},
		{
			title: "La La Land",
			imdb: 8.0,
			poster:
				"https://image.tmdb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
			trailer: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
		},
		{
			title: "Friends (Sitcom)",
			imdb: 8.9,
			poster:
				"https://image.tmdb.org/t/p/original/f496cm9enuEsZkSPzCwnTESEK5s.jpg",
			trailer: "https://youtu.be/8wThS5WCzs4?si=A4mSf9Jzy6wH2ISd",
		},
		{
			title: "Brooklyn Nine-Nine (Sitcom)",
			imdb: 8.4,
			poster:
				"https://image.tmdb.org/t/p/original/hgRMSOt7a1b8qyQR68vUixJPang.jpg",
			trailer: "https://www.youtube.com/watch?v=sEOuJ4z5aTc",
		},
	],

	sad: [
		{
			title: "The Fault in Our Stars",
			imdb: 7.7,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/4/41/The_Fault_in_Our_Stars_%28Official_Film_Poster%29.png",
			trailer: "https://youtu.be/9ItBvH5J6ss",
		},
		{
			title: "Titanic",
			imdb: 7.9,
			poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
			trailer: "https://youtu.be/kVrqfYjkTdQ",
		},
		{
			title: "A Walk to Remember",
			imdb: 7.3,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/dc/A_Walk_to_Remember_Poster.jpg",
			trailer: "https://youtu.be/k3B2XBcp7vA",
		},
		{
			title: "The Green Mile",
			imdb: 8.6,
			poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
			trailer: "https://youtu.be/Ki4haFrqSrw",
		},
		{
			title: "Manchester by the Sea",
			imdb: 7.8,
			poster: "https://image.tmdb.org/t/p/w500/9n5e1vToDVnqz3hW10Jdlvmzpo0.jpg",
			trailer: "https://youtu.be/gsVoD0pTge0",
		},
	],

	nostalgic: [
		{
			title: "Spirited Away",
			imdb: 8.6,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
			trailer: "http://www.youtube.com/watch?v=ByXuk9QqQkk",
		},
		{
			title: "5 Centimeters per Second",
			imdb: 7.5,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/thumb/9/92/5_Centimeters_Per_Second.jpg/250px-5_Centimeters_Per_Second.jpg",
			trailer: "http://www.youtube.com/watch?v=wdM7athAem0",
		},

		{
			title: "Dil Chahta Hai",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/db/Dil_Chahta_Hai.jpg",
			trailer: "http://www.youtube.com/watch?v=OBAcYSSUf6o",
		},
		{
			title: "Lagaan: Once Upon a Time in India",
			imdb: 8.1,
			poster:
				"https://m.media-amazon.com/images/M/MV5BM2FmODM4OTktOTRjOS00ZTIzLWIzZjAtMDBhOGEzYThkNzMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
			trailer: "http://www.youtube.com/watch?v=Nhi4Azs2nEw",
		},
		{
			title: "Natsamrat",
			imdb: 8.8,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/e/e0/Natsamrat_2016_Marathi_film_poster.jpg",
			trailer: "http://www.youtube.com/watch?v=DCXDyIsPEN8",
		},
	],

	romantic: [
		{
			title: "Pride & Prejudice",
			imdb: 7.8,
			poster: "https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg",
			trailer: "https://youtu.be/1dYv5u6v55Y",
		},
		{
			title: "Before Sunrise",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/da/Before_Sunrise_poster.jpg",
			trailer: "https://youtu.be/6MUcuqbGTxc",
		},
		{
			title: "La La Land",
			imdb: 8.0,
			poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
			trailer: "https://youtu.be/0pdqf4P9MB8",
		},
		{
			title: "Dilwale Dulhania Le Jayenge",
			imdb: 8.0,
			poster: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
			trailer: "https://youtu.be/cmax1C1p660",
		},
		{
			title: "Yeh Jawaani Hai Deewani",
			imdb: 7.2,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/1/15/Yeh_jawani_hai_deewani.jpg",
			trailer: "https://youtu.be/Rbp2XUSeUNE",
		},
	],

	adventurous: [
		{
			title: "The Lord of the Rings: The Fellowship of the Ring",
			imdb: 8.9,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg",
			trailer: "http://www.youtube.com/watch?v=_e8QGuG50ro",
		},
		{
			title: "Indiana Jones and the Raiders of the Lost Ark",
			imdb: 8.4,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/a/a6/Raiders_of_the_Lost_Ark_Theatrical_Poster.jpg",
			trailer: "http://www.youtube.com/watch?v=0xQSIdSRlAk",
		},
		{
			title: "Spirited Away",
			imdb: 8.6,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
			trailer: "http://www.youtube.com/watch?v=ByXuk9QqQkk",
		},
		{
			title: "Princess Mononoke",
			imdb: 8.4,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/8/8c/Princess_Mononoke_Japanese_poster.png",
			trailer: "http://www.youtube.com/watch?v=4OiMOHRDs14",
		},
		{
			title: "Howl's Moving Castle",
			imdb: 8.2,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg",
			trailer: "http://www.youtube.com/watch?v=iwROgK94zcM",
		},
	],

	excited: [
		{
			title: "Spider-Man: Into the Spider-Verse",
			imdb: 8.4,
			poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
			trailer: "https://youtu.be/g4Hbz2jLxvQ",
		},
		{
			title: "Avengers: Endgame",
			imdb: 8.4,
			poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
			trailer: "https://youtu.be/TcMBFSGVi1c",
		},
		{
			title: "Guardians of the Galaxy",
			imdb: 8.0,
			poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
			trailer: "https://youtu.be/d96cjJhvlMA",
		},
		{
			title: "Jumanji: Welcome to the Jungle",
			imdb: 6.9,
			poster: "https://image.tmdb.org/t/p/w500/pSgXKPU5h6U89ipF7HBYajvYt7j.jpg",
			trailer: "https://youtu.be/2QKg5SZ_35I",
		},
		{
			title: "The Greatest Showman",
			imdb: 7.5,
			poster: "https://image.tmdb.org/t/p/w500/b9CeobiihCx1uG1tpw8hXmpi7nm.jpg",
			trailer: "https://youtu.be/EodWwczRIe4",
		},
	],

	lonely: [
		{
			title: "Her",
			imdb: 8.0,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
			trailer: "https://www.youtube.com/watch?v=anlrUiZvCfU",
		},
		{
			title: "Lost in Translation",
			imdb: 7.7,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=W6iVPCRflQM",
		},
		{
			title: "Joker",
			imdb: 8.4,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
		},
		{
			title: "Rockstar",
			imdb: 7.7,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/6/68/Rockstar-Movie-Poster.jpg",
			trailer: "https://www.youtube.com/watch?v=bD5FShPZdpw",
		},
		{
			title: "In the Mood for Love",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/4/45/In_the_Mood_for_Love_movie.jpg",
			trailer: "https://www.youtube.com/watch?v=m8GuedsQnWQ",
		},
	],

	angry: [
		{
			title: "Fight Club",
			imdb: 8.8,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
		},
		{
			title: "Whiplash",
			imdb: 8.5,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=7d_jQycdQGo",
		},
		{
			title: "Mad Max: Fury Road",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg",
			trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
		},
		{
			title: "Kabir Singh",
			imdb: 7.0,
			poster: "https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg",
			trailer: "https://www.youtube.com/watch?v=RiANSSgCuJk",
		},
		{
			title: "Oldboy",
			imdb: 8.4,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg",
			trailer: "https://www.youtube.com/watch?v=2HkjrJ6IK5E",
		},
	],

	relaxed: [
		{
			title: "Before Sunrise",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/da/Before_Sunrise_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=6MUcuqbGTxc",
		},
		{
			title: "Into the Wild",
			imdb: 8.1,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/dc/Into_the_Wild_%282007_film_poster%29.png",
			trailer: "https://youtu.be/XZG1FzyB8DI?si=Bln3HZGPXYNRsy3_",
		},
		{
			title: "Midnight in Paris",
			imdb: 7.7,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/9/9f/Midnight_in_Paris_Poster.jpg",
			trailer: "https://www.youtube.com/watch?v=FAfR8omt-CY",
		},
		{
			title: "Yeh Jawaani Hai Deewani",
			imdb: 7.2,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/1/15/Yeh_jawani_hai_deewani.jpg",
			trailer: "https://www.youtube.com/watch?v=Rbp2XUSeUNE",
		},
		{
			title: "Amélie",
			imdb: 8.3,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=HUECWi5pX7o",
		},
	],

	inspired: [
		{
			title: "The Pursuit of Happyness",
			imdb: 8.0,
			poster: "https://cdng.europosters.eu/pod_public/1300/263601.jpg",
			trailer: "https://youtu.be/DMOBlEcRuw8?si=UpMpwnDRjl6OzQs8",
		},
		{
			title: "3 Idiots",
			imdb: 8.4,
			poster:
				"https://image.tmdb.org/t/p/original/66A9MqXOyVFCssoloscw79z8Tew.jpg",
			trailer: "https://youtu.be/xvszmNXdM4w",
		},
		{
			title: "Dead Poets Society",
			imdb: 8.1,
			poster:
				"https://image.tmdb.org/t/p/original/l5NbiHKUmahlAT3Q1ig8Tyl9xrc.jpg",
			trailer: "https://youtu.be/ye4KFyWu2do",
		},
		{
			title: "The Theory of Everything",
			imdb: 7.7,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/6/67/The_Theory_of_Everything_%282014%29.jpg",
			trailer: "https://youtu.be/Salz7uGp72c",
		},
		{
			title: "Dangal",
			imdb: 8.3,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg",
			trailer: "https://youtu.be/x_7YlGv9u1g",
		},
	],

	curious: [
		{
			title: "Interstellar",
			imdb: 8.6,
			poster:
				"https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
			trailer: "https://youtu.be/zSWdZVtXT7E",
		},
		{
			title: "Inception",
			imdb: 8.8,
			poster:
				"https://image.tmdb.org/t/p/original/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
			trailer: "https://youtu.be/YoHD9XEInc0",
		},
		{
			title: "Tumbbad",
			imdb: 8.2,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/4/41/Tumbbad_poster.jpg",
			trailer: "https://youtu.be/EUKhHJlIveY?si=-SN5Bz5HhRDHxvRn",
		},
		{
			title: "The Prestige",
			imdb: 8.5,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Prestige_poster.jpg/250px-Prestige_poster.jpg",
			trailer: "https://youtu.be/o4gHCmTQDVI",
		},
		{
			title: "Arrival",
			imdb: 7.9,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg",
			trailer: "https://youtu.be/tFMo3UJ4B4g",
		},
	],

	thrilled: [
		{
			title: "Mad Max: Fury Road",
			imdb: 8.1,
			poster:
				"https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
			trailer: "https://youtu.be/hEJnMQG9ev8",
		},
		{
			title: "Andhadhun",
			imdb: 8.2,
			poster:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcziRXHx2qujfy7nO318_PCE-luhdkGA5tLQ&s",
			trailer: "https://youtu.be/2iVYI99VGaw",
		},
		{
			title: "John Wick",
			imdb: 7.4,
			poster:
				"https://www.tallengestore.com/cdn/shop/products/JohnWick-KeanuReeves-HollywoodEnglishActionMoviePoster-2_1eac59c5-8747-4ce2-937b-4b916be044cc.jpg?v=1649071607",
			trailer: "https://youtu.be/2AUmvWm5ZDQ",
		},
		{
			title: "The Dark Knight",
			imdb: 9.0,
			poster:
				"https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
			trailer: "https://youtu.be/EXeTwQWrcwY",
		},
		{
			title: "War",
			imdb: 6.5,
			poster:
				"https://mir-s3-cdn-cf.behance.net/project_modules/fs/a1d95586386965.5d97886ac225d.jpg",
			trailer: "https://youtu.be/tQ0mzXRk-oM",
		},
	],

	horror: [
		{
			title: "The Conjuring",
			imdb: 7.5,
			poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
			trailer: "https://youtu.be/k10ETZ41q5o",
		},
		{
			title: "A Quiet Place",
			imdb: 7.5,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/a/a0/A_Quiet_Place_film_poster.png",
			trailer: "https://youtu.be/WR7cc5t7tv8",
		},
		{
			title: "Hereditary",
			imdb: 7.3,
			poster: "https://image.tmdb.org/t/p/w500/p9fmuz2Oj3HtEJEqbIwkFGUhVXD.jpg",
			trailer: "https://youtu.be/V6wWKNij_1M",
		},
		{
			title: "The Exorcist",
			imdb: 8.1,
			poster: "https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg",
			trailer: "https://youtu.be/YDGw1MTEe9k",
		},
		{
			title: "Get Out",
			imdb: 7.7,
			poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
			trailer: "https://youtu.be/DzfpyUB60YY",
		},
	],

	hopeful: [
		{
			title: "The Shawshank Redemption",
			imdb: 9.3,
			poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
			trailer: "https://youtu.be/6hB3S9bIaco",
		},
		{
			title: "Forrest Gump",
			imdb: 8.8,
			poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
			trailer: "https://youtu.be/bLvqoHBptjg",
		},
		{
			title: "Life of Pi",
			imdb: 7.9,
			poster: "https://image.tmdb.org/t/p/w500/iLgRu4hhSr6V1uManX6ukDriiSc.jpg",
			trailer: "https://youtu.be/3mMN693-F3U?si=K0MBDpu5nwhnW1ub",
		},
		{
			title: "Good Will Hunting",
			imdb: 8.3,
			poster:
				"https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png",
			trailer: "https://youtu.be/ReIJ1lbL-Q8",
		},
		{
			title: "The Secret Life of Walter Mitty",
			imdb: 7.3,
			poster: "https://image.tmdb.org/t/p/w500/tYkMtYPNpUdLdzGDUTC5atyMh9X.jpg",
			trailer: "https://youtu.be/QD6cy4PBQPI",
		},
	],

	melancholic: [
		{
			title: "The Green Mile",
			imdb: 8.6,
			poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
			trailer: "https://youtu.be/Ki4haFrqSrw",
		},
		{
			title: "Schindler's List",
			imdb: 9.0,
			poster: "https://image.tmdb.org/t/p/w500/c8Ass7acuOe4za6DhSattE359gr.jpg",
			trailer: "https://youtu.be/gG22XNhtnoY",
		},
		{
			title: "Grave of the Fireflies",
			imdb: 8.5,
			poster: "https://image.tmdb.org/t/p/w500/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg",
			trailer: "https://youtu.be/4vPeTSRd580",
		},
		{
			title: "Requiem for a Dream",
			imdb: 8.3,
			poster: "https://image.tmdb.org/t/p/w500/nOd6vjEmzCT0k4VYqsA2hwyi87C.jpg",
			trailer: "https://youtu.be/jzk-lmU4KZ4",
		},
		{
			title: "The Pianist",
			imdb: 8.5,
			poster: "https://image.tmdb.org/t/p/w500/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg",
			trailer: "https://youtu.be/BFwGqLa_oAo",
		},
	],

	energetic: [
		{
			title: "Mad Max: Fury Road",
			imdb: 8.1,
			poster:
				"https://tse3.mm.bing.net/th/id/OIP.TLUbqwl7NY6EGEdI90VfWwAAAA?w=440&h=660&rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/hEJnMQG9ev8?si=bNk7I1WjdlbxQRdm",
		},

		{
			title: "Baby Driver",
			imdb: 7.6,
			poster:
				"https://tse2.mm.bing.net/th/id/OIP.WkalWUUCSguP5Q_lTmYKeQHaK_?rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/zTvJJnoWIPk?si=1OlsRmxxHGsGyyz6",
		},
		{
			title: "The Dark Knight",
			imdb: 9.0,
			poster: "https://m.media-amazon.com/images/I/91dyhbKzr-L._AC_SY679_.jpg",
			trailer: "https://youtu.be/EXeTwQWrcwY?si=RQBZ0tLVPeCfAEpw",
		},
		{
			title: "John Wick",
			imdb: 7.4,
			poster:
				"https://image.tmdb.org/t/p/original/tcmcJAXN2nUf1HgY1PL2H72PD6I.jpg",
			trailer: "https://youtu.be/C0BMx-qxsP4?si=BP8lvk3ELgsD5N7u",
		},
		{
			title: "Edge of Tomorrow",
			imdb: 7.9,
			poster:
				"https://i.pinimg.com/originals/fd/32/b7/fd32b73b472bb2c005a8b5068350ce93.jpg",
			trailer: "https://youtu.be/vw61gCe2oqI?si=VaD2gVQYSFYfIWS4",
		},
	],

	sleepy: [
		{
			title: "Lost in Translation",
			imdb: 7.7,
			poster:
				"https://c8.alamy.com/comp/R59HCA/lost-in-translation-original-movie-poster-R59HCA.jpg",
			trailer: "https://youtu.be/W6iVPCRflQM?si=0ogwmxuCee6U865b",
		},

		{
			title: "Her",
			imdb: 8.0,
			poster:
				"https://alternativemovieposters.com/wp-content/uploads/2015/08/her.jpg",
			trailer: "https://youtu.be/dJTU48_yghs?si=jPLGzyfRw6dk8T0n",
		},

		{
			title: "The Secret Life of Walter Mitty",
			imdb: 7.3,
			poster:
				"https://tse2.mm.bing.net/th/id/OIP.3aYju-iFRfP7v8CJQW5B2gHaEo?w=1600&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/QD6cy4PBQPI?si=IiUN3Ys6XWDIzDmv",
		},

		{
			title: "Paterson",
			imdb: 7.4,
			poster:
				"https://tse3.mm.bing.net/th/id/OIP.AFASFQIQMbDpMrMXPUQAhwHaKe?rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/32exBSNsaBw?si=joxd5j-zkU_vRjec",
		},

		{
			title: "Before Sunrise",
			imdb: 8.1,
			poster:
				"https://ih1.redbubble.net/image.2152306966.2200/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
			trailer: "https://youtu.be/6MUcuqbGTxc?si=mp7MmFJDxoeedNvX",
		},
	],

	confused: [
		{
			title: "Inception",
			imdb: 8.8,
			poster:
				"https://c8.alamy.com/comp/2JKYD0T/movie-poster-inception-2010-2JKYD0T.jpg",
			trailer: "https://youtu.be/YoHD9XEInc0?si=7rpb6CiTgDKPBF3N",
		},

		{
			title: "Shutter Island",
			imdb: 8.2,
			poster:
				"https://cdn.posteritati.com/posters/000/000/069/726/shutter-island-md-web.jpg",
			trailer: "https://youtu.be/v8yrZSkKxTA?si=0sP6vZyCiTqIzXcQ",
		},

		{
			title: "Donnie Darko",
			imdb: 8.0,
			poster:
				"https://tse3.mm.bing.net/th/id/OIP.8p7sW_6dksAtVU1leb10-AHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/bzLn8sYeM9o?si=jm_n62mMovdjk7c7",
		},

		{
			title: "Mulholland Drive",
			imdb: 8.0,
			poster:
				"https://tse2.mm.bing.net/th/id/OIP.alALs_9K5PE7uyjTRJm94wHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
			trailer: "https://youtu.be/jbZJ487oJlY?si=ChdEymG_dlyce_sH",
		},

		{
			title: "The Matrix",
			imdb: 8.7,
			poster:
				"https://c8.alamy.com/comp/2JH2N9A/pantolianofishburnereevesposter-the-matrix-1999-2JH2N9A.jpg",
			trailer: "https://youtu.be/vKQi3bBA1y8?si=Btsu6Tpt-yZnZcmG",
		},
	],
};

/* ---------- Utility helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}

/* Convert IMDb (0-10) to 5-star string (★) */
function starsFromImdb(imdb) {
	const five = Math.round((imdb / 10) * 5);
	return "★".repeat(five) + "☆".repeat(5 - five);
}

/* Shuffle array in-place */
function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/* ---------- Rendering ---------- */
function renderEmpty(message) {
	const results = $("#results");
	results.innerHTML = `<div class="empty">${message}</div>`;
}

function renderMovies(list) {
	const results = $("#results");
	results.innerHTML = "";
	if (!list || list.length === 0) {
		renderEmpty("No movies found for this mood. Try another mood.");
		return;
	}

	list.forEach((movie) => {
		const card = document.createElement("article");
		card.className = "card";

		card.innerHTML = `
      <img class="poster" src="${movie.poster}" alt="${escapeHtml(movie.title)} poster" loading="lazy" />
      <div class="info">
        <h3 class="title">${escapeHtml(movie.title)}</h3>
        <div class="meta">
          <div class="imdb">IMDb <strong>${movie.imdb.toFixed(1)}</strong></div>
          <div class="stars" title="Rating">${starsFromImdb(movie.imdb)}</div>
        </div>
        <div class="card-actions">
          <button class="action-btn trailer" data-trailer="${movie.trailer}">Watch Trailer</button>
          <button class="action-btn details" data-title="${escapeHtml(movie.title)}">More</button>
        </div>
      </div>
    `;

		// trailer click opens in new tab
		card.querySelector(".trailer").addEventListener("click", (e) => {
			const url = e.currentTarget.dataset.trailer;
			if (url) window.open(url, "_blank");
		});

		// details button can be extended later
		card.querySelector(".details").addEventListener("click", () => {
			alert(
				`${movie.title}\nIMDb: ${movie.imdb}\nTrailer will open in a new tab.`,
			);
		});

		results.appendChild(card);
	});
}

/* Simple HTML escape for titles */
function escapeHtml(str) {
	return String(str).replace(
		/[&<>"']/g,
		(m) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				m
			],
	);
}

/* ---------- Main logic ---------- */
function getSelectedMood() {
	return $("#mood").value.trim().toLowerCase();
}

function getSelectedCount() {
	const n = parseInt($("#count").value, 10);
	return clamp(isNaN(n) ? 3 : n, 1, 5);
}

function recommendMovies() {
	const mood = getSelectedMood();
	const count = getSelectedCount();
	const list = movieDB[mood];

	if (!list) {
		renderEmpty(`No mood named "${mood}" found. Choose from the dropdown.`);
		return;
	}

	// default: top N (preserve order). You can shuffle first if desired.
	const selection = list.slice(0, count);
	renderMovies(selection);
}

/* Shuffle current mood and show N */
function shuffleRecommendations() {
	const mood = getSelectedMood();
	const count = getSelectedCount();
	const list = movieDB[mood];
	if (!list) {
		renderEmpty(`No mood named "${mood}" found. Choose from the dropdown.`);
		return;
	}
	const shuffled = shuffleArray([...list]).slice(0, count);
	renderMovies(shuffled);
}

/* ---------- Initialization ---------- */
document.addEventListener("DOMContentLoaded", () => {
	$("#recommendBtn").addEventListener("click", recommendMovies);
	$("#shuffleBtn").addEventListener("click", shuffleRecommendations);

	// ✅ ENTER key triggers recommend
	document.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			$("#recommendBtn").click();
		}
	});

	// render initial recommendations for default mood
	recommendMovies();
});
