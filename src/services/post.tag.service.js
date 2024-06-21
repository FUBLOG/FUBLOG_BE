const {
  ConflictRequestError,
  NotFoundError,
  BadRequestError,
} = require("../core/response/error.response");
const {
  getAll,
  createNewTag,
  deleteTag,
  updateTag,
  viewTag,
} = require("../repository/post.tag.repo");
class TagService {
  createNewTag = async ({ postTagContent }) => {
    const create = await createNewTag({ postTagContent });
    if (create.length === 0) throw new BadRequestError("Content is empty");
    return create;
  };

  viewTag = async (id) => {
    const viewATag = await viewTag(id);
    if (viewATag.length === 0) throw new NotFoundError("Cannot Find Tag Id");
    return viewATag;
  };

  viewAllTag = async () => {
    const viewTag = await getAll();
    if (viewTag.length === 0) throw new NotFoundError("Cannot Find  ");
    return viewTag;
  };

  updateTag = async (id, content) => {
    if ((await this.viewTag(id).length) === 0)
      throw new NotFoundError("Cannot Find ID");
    if (content.length === 0) throw new BadRequestError("Content is empty");
    return await updateTag(id, content);
  };

  deleteTag = async (id) => {
    if ((await this.viewTag(id).length) === 0)
      throw new NotFoundError("Cannot Find ID");
    return await deleteTag(id);
  };
}
module.exports = new TagService();
