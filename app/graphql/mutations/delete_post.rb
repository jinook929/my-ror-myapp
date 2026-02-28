# frozen_string_literal: true

module Mutations
  class DeletePost < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: false

    def resolve(id:)
      post = Post.find(id)
      post.destroy
      { id: id }
    end
  end
end
