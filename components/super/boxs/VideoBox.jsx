// components
import Button from "../../buttons/index"
import Table from "../tables/TableWrapper"
import VideoRow from "../tables/rows/VideoRow"
import Loader from "../../Loader"

const BoxVideo = (props) => {
  const { results, status, message, stats, is_loading, total } = props.data

  return (
    <>
      {results && results.length && total && !props.noStats ? (
        <React.Fragment>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{total}</strong> videos
        </React.Fragment>
      ) : null}

      <Table>
        {status
          ? results && results.length > 0
            ? results.map((n, key) => <VideoRow key={key} data={n} />)
            : null
          : null}
      </Table>

      {is_loading || !status ? <Loader /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length >= props.maxResults ? (
        <div className="grid-center m-t-30">
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
            size="large"
            onClick={() => {
              props.loadmoreHandler()
            }}
          />
        </div>
      ) : null}
    </>
  )
}

export default BoxVideo
