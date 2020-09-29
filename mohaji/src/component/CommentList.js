import './CommentList.css';
import React from 'react';
import { connect } from 'react-redux';
import { loadCommentList, setIsMoreRead } from '../actions';
import CommentItem from './CommentItem'
import { Link, Redirect } from 'react-router-dom';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoreRead = this.handleMoreRead.bind(this);
  }

  handleMoreRead() {
    if (this.props.isMoreRead) {
      this.props.dispatch(loadCommentList(Array(10).fill('').map(() => ({
        nickname: 'Pig-Cola',
        create_at: new Date().toLocaleString(),
        msg: '안녕하세요'
      }))));
    }

    // 하단의 검증은 필요없어서 주석처리함 

    // else {
    //   // MoreRead 페이지로 이동
    //   // <Redirect to='이동할 Route의 path'/> // MoreRead Component 구축 후 주석 해제, side바 라우터 구축 후 함, 안될시 더보기에 링크로 감쌈
    //   // this.props.dispatch(setIsMoreRead(true)); // 해당 라인은 MoreRead Component가 구축되면 지울것(주석처리)
    // }
  }




  render() {
    // 하단에 쓰여진 val.nickname 등의 변수 이름은
    // api에 따라 달라질 수 있음.
    let { isMoreRead } = this.props
    return (

      <div>
        {this.props.commentList.reduce((acc, val, i) => {
          if (!isMoreRead) {
            if (i < 5) {
              acc.push(<CommentItem
                nickname={val.nickname}
                create_at={val.create_at}
                msg={val.msg}
                key={i}
              />)
            }
          } else {
            acc.push(<CommentItem
              nickname={val.nickname}
              create_at={val.create_at}
              msg={val.msg}
              key={i}
            />)
          }
          return acc;
        }, [])}
        {!isMoreRead ?
          <Link to='/spot-list/more-read'>
            <div id='more'>더보기</div>
          </Link> :
          <div id='more' onClick={this.handleMoreRead}>더보기</div>
          }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.commentReducer,
  currSpot: state.spotReducer.currSpot
})

export default connect(mapStateToProps)(CommentList);