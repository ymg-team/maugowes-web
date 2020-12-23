import React from "react"
import { createPost, updatePost } from "../../redux/blog/actions"

// components
import InputText from "./InputText"
import InputFile from "./InputFile"
import InputTag from "./InputTag"
import Editor from "./Editor"
import Submit from "./Submit"
import FormStyled from "./FormStyled"
import Toast from "../../modules/toast"
import { stateValidatorChecker } from "../../modules/validator"

class BlogPage extends React.Component {
  state = {}

  submitHandler() {
    const {} = this.state
  }

  componentDidMount() {
    if (this.props.isEdit) {
      const { blogData } = this.props
      this.setState({
        title: blogData.title,
        content: blogData.content,
        tags: blogData.tags,
        video: blogData.video,
        image_preview: blogData.image.original,
      })
    } else {
      this.setState({
        tags: [],
      })
    }
  }

  componentWillReceiveProps(np) {
    const { formResponse } = np
    if (formResponse.status == 200 || formResponse.status == 201) {
      location.href = "/super/blog"
    }
  }

  submitHandler(draft = false) {
    let requiredInputs = ["title"]

    if (!this.props.isEdit) requiredInputs.push("image")

    // start form validation
    const { is_valid } = stateValidatorChecker({
      setState: (ns, cb) => this.setState(ns, cb),
      state: this.state,
      requiredInputs,
    })

    if (is_valid) {
      if (!this.state.content) return Toast(true, "Konten wajib diisi", "error")

      if (!this.props.isEdit && !this.state.image)
        return Toast(true, "Wajib upload gambar", "error")

      let formdata = {
        title: this.state.title,
        content: this.state.content,
        tags:
          this.state.tags && this.state.tags.length > 0
            ? this.state.tags.toString()
            : "blog",
      }

      if (this.state.video) formdata.video = this.state.video
      if (this.state.image) formdata.image = this.state.image

      // is draft post or not
      if (draft) formdata.draft = true
      else formdata.draft = false

      // action to submit post
      if (this.props.isEdit) {
        this.props.dispatch(updatePost(formdata, this.props.blogData.id))
      } else {
        this.props.dispatch(createPost(formdata))
      }
    }
  }

  render() {
    const { is_loading, status } = this.props.formResponse

    let requiredInputs = ["title"]

    if (!this.props.isEdit) requiredInputs.push("image")

    return (
      <FormStyled method="post" action="javascript:;">
        <InputFile
          label="Gambar Utama"
          name="image"
          accept="image/*"
          value={this.state.image || {}}
          preview={this.state.image_preview}
          validate={this.state.image_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required={!this.props.isEdit}
        />
        <InputText
          label="Video"
          placeholder="Video Embed Url"
          type="text"
          value={this.state.video || ""}
          validate={this.state.video_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          name="video"
        />
        <InputText
          label="title"
          placeholder="Judul postingan"
          type="text"
          value={this.state.title || ""}
          validate={this.state.title_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          name="title"
          required
        />
        <Editor
          label="content"
          name="content"
          setState={(n, cb) => this.setState(n, cb)}
          value={this.state.content}
          required
        />
        <InputTag
          label="Tags / Labels"
          name="tags"
          tags={this.state.tags || []}
          initialValue={this.state.tags}
          setState={(n, cb) => this.setState(n, cb)}
        />
        <br />
        <Submit
          className="btn-inline"
          style={{ display: "inline", marginRight: 10 }}
          onClick={() => this.submitHandler()}
          loading={is_loading || status == 200 || status == 201}
          text="Simpan Post"
          setState={(n, cb) => this.setState(n, cb)}
        />
        <Submit
          className="btn-inline"
          color="white"
          style={{ display: "inline", marginRight: 10 }}
          onClick={() => this.submitHandler(true)}
          loading={is_loading || status == 200 || status == 201}
          setState={(n, cb) => this.setState(n, cb)}
          text="Simpan Draft"
        />
      </FormStyled>
    )
  }
}

export default BlogPage
