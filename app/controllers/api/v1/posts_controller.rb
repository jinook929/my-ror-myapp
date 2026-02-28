module Api
  module V1
    class PostsController < BaseController
      before_action :set_post, only: [ :show, :update, :destroy ]

      def index
        @posts = Post.all.order(created_at: :desc)
        render json: @posts
      end

      def show
        render json: @post
      end

      def create
        @post = Post.new(post_params)
        if @post.save
          render json: @post, status: :created
        else
          render json: { errors: @post.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: { errors: @post.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @post.destroy
        head :no_content
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.expect(post: [ :title, :content ])
      end
    end
  end
end
