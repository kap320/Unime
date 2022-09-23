import loadable from "@loadable/component"
import { useEffect, useState } from "react"
import axios from "axios"
// COMPONENTS
const RandomAnimeTitle = loadable(() => import("../RandomAnimeTitle"))
const RandomAnimeInfo = loadable(() => import("../RandomAnimeInfo"))
const CharacterDetail = loadable(() => import("../CharacterDetail"))
const RandomAnimeRightCover = loadable(() => import("../RandomAnimeRightCover"))

function RandomAnime({ instance }) {
	const [randomAnime, setRandomAnime] = useState({})
	const [done, setDone] = useState(false)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getRandom = () => {
			instance
				.get("/today", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRandomAnime(data.data.data)
					setDone(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getRandom()
		return () => {
			source.cancel()
		}
	}, [instance])

	return (
		<>
			{Object.keys(randomAnime || {}).length === 0 ? (
				""
			) : (
				<div className="today-section" style={{ marginTop: "42px" }}>
					<h1
						className="today-h1 "
						style={{
							marginBottom: "42px",
							float: "right",
							marginRight: "30px",
						}}
					>
						CÓ THỂ BẠN SẼ THÍCH ĐÓ
					</h1>
					<div className="clearfix"></div>
					<div className="row w-100 flex-responsive">
						<div className="col-9 flex-mobile">
							<RandomAnimeTitle randomAnime={randomAnime} />
							<div
								className="info-character-wrapper"
								style={{ marginTop: "22px" }}
							>
								<RandomAnimeInfo randomAnime={randomAnime} />
								<CharacterDetail randomAnime={randomAnime} done={done} />
							</div>
						</div>
						<div className="col-3">
							<RandomAnimeRightCover randomAnime={randomAnime} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default RandomAnime