import Styled from "styled-components"

// conditional import components
let TagsComp = null
if (typeof window !== "undefined") {
  const { Tags } = require("../../modules/tagify")
  TagsComp = Tags
}

const InputTagsStyled = Styled.div`
  .tagify {
    border: none;
    border-bottom: 2px solid #969696;
  }
`

const InputTags = (props) => {
  const tagifyAddHandler = (e) => {
    let { tags } = props
    tags.push(e.detail.data.value)
    props.setState({ [props.name]: tags })
  }

  const tagifyRemoveHandler = (e) => {
    let { tags } = props
    const index = tags.indexOf(e.detail.data.value)
    tags.splice(index, 1)
    props.setState({ [props.name]: tags })
  }

  // ref: https://github.com/yairEO/tagify#react
  const TagifySettings = {
    callbacks: {
      add: tagifyAddHandler,
      remove: tagifyRemoveHandler,
    },
  }

  return (
    <InputTagsStyled className="form-child">
      <label htmlFor={props.id || props.name}>
        {props.label}{" "}
        {props.required && props.label ? (
          <span className="text-red">*</span>
        ) : null}
      </label>
      {TagsComp && props.name && props.initialValue ? (
        <TagsComp
          settings={TagifySettings}
          mode="input"
          name={props.name}
          initialValue={props.initialValue}
        />
      ) : null}
    </InputTagsStyled>
  )
}

InputTags.defaultProps = {
  initialValue: "",
  tags: [],
}

export default InputTags
