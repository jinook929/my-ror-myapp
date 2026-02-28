# frozen_string_literal: true

module Mutations
  class UpdatePost < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: true
    argument :content, String, required: true

    field :post, Types::PostType, null: true
    field :errors, [ String ], null: false

    def resolve(id:, title:, content:)
      post = Post.find(id)
      if post.update(title: title, content: content)
        { post: post, errors: [] }
      else
        { post: nil, errors: post.errors.full_messages }
      end
    end
  end
end
