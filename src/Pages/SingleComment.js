import React from 'react';

const SingleComment = (props) => {

     


    const comment = props.singleComment
    return (
        <div>
           <div className='my-6 w-screen lg:w-10/12 mx-auto'>
          

        </div> 
            <div className='max-w-[600px] lg:w-[600px] p-4 mx-auto'>

                <img className='block mx-auto max-w-[250px] h-[200px]' src={comment.link} alt="" />
                <p className='mt-12'>Name: <span className='font-bold'>{comment.name}</span></p>
                <h4 className='font-bold text-xl my-3'>Comments</h4>
                <div>
                    {

                        comment.comments.map(c => {
                            let name = ""
                            Object.keys(c).forEach(f => {
                                name = f
                            })

                            return (
                                <p className='break-all my-2 text-[0.9rem]'>
                                    <span className='font-bold'>{name}</span> : {
                                        c[Object.keys(c)[0]]?.map(d => {
                                            return (
                                                <>
                                                    ,{" " + d}
                                                </>
                                            )
                                        })


                                    }
                                </p>

                            )
                        })
                    }
                </div>


            </div>
        </div>
    );
};

export default SingleComment;

