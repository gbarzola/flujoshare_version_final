class CommentsController < ApplicationController
    def create
		@post = Post.find(params[:post_id])
		@comment = @post.comments.create(params[:comment].permit(:nombre, :comentario))
		@comment.user_id = current_user.id if current_user
		@comment.save
		if @comment.save
			redirect_to post_path(@post)
		else
			render 'new'
		end
	end

	def destroy
		@post = Post.find(params[:post_id])
		@comment = @post.comments.find(params[:id])
		@comment.destroy

		redirect_to post_path(@post)
	end
end
