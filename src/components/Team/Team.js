import React from 'react'
import { Card, CardContent, Grid, Typography, CardMedia, makeStyles, IconButton, CardActions } from '@material-ui/core'
import { GitHub, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        marginTop: 20
    },
    card: {
        display: 'flex',
        maxWidth: 768,
    },
    media: {
        height: 200,
        width: 200,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    giticon: {
        color: '#333'
    },
    linkedin: {
        color: '#0077b5'
    }, 
    toppad: {
        marginTop: 30,
    }

});


export default function Team() {
    const classes = useStyles();

    return (
        <Grid container alignItems='center' justify='center' direction='column'>
            <Grid item xs={12} className={classes.root}>

            <Typography variant='h3' className={classes.toppad}>Meet The Team!</Typography>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card} raised={true}>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        src='https://res.cloudinary.com/crowandrew/image/upload/c_fill,h_200,w_200/v1607119544/minnesvart/andrew_crow_2x_xc5ovp.jpg'
                    />
                    <CardContent>
                        <Typography variant='h5'>Andrew Crow</Typography>
                        <Typography>Full-stack developer with senior-level leadership experience and recent graduate from the University of Washington Coding Bootcamp. Skills in Javascript, React, and HTML/CSS and strengths in building strong teams from within, process improvement, and exceeding targets. Positioned to provide a customer-first perspective on how to approach application and design challenges by leveraging my background in sales and sales leadership. Eager to learn every day and to challenge myself and those around me to build amazing and meaningful web applications</Typography>
                        <CardActions>
                            <IconButton
                                className={classes.giticon} href='https://github.com/crowandrew'>
                                <GitHub ></GitHub>
                            </IconButton>
                            <IconButton
                                className={classes.linkedin}
                                href='https://www.linkedin.com/in/crow-andrew/'>
                                <LinkedIn></LinkedIn>
                            </IconButton>
                        </CardActions>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card} raised={true}>
                    <CardContent>
                        <Typography variant='h5'>Kayla Newlon</Typography>
                        <Typography>Full Stack Web Developer with a background leading diverse teams in the hospitality industry. Graduate of the University of Washington Coding Bootcamp with skills in browser-based technologies. Instrumental in streamlining and improving processes, enhancing company productivity, and implementing strategic solutions. History in Cultural Anthropology, Recreation and Ecotourism. Passionate about creating tools for education and sustainability.</Typography>
                        <CardActions>
                            <IconButton
                                className={classes.giticon} href='https://github.com/kbnewlon'>
                                <GitHub ></GitHub>
                            </IconButton>
                            <IconButton
                                className={classes.linkedin}
                                href='https://www.linkedin.com/in/kayla-newlon/'>
                                <LinkedIn></LinkedIn>
                            </IconButton>
                        </CardActions>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        src='https://res.cloudinary.com/crowandrew/image/upload/c_fill,h_200,w_200/v1607119522/minnesvart/ProfilePic_q2pqll.jpg'
                    />

                </Card>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card} raised={true}>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        src='https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_200/v1607119591/minnesvart/profilePic_1_zujy0t.jpg'
                    />
                    <CardContent>
                        <Typography variant='h5'>Larry Cessna</Typography>
                        <Typography>Web developer and U.S. Navy veteran with experience in technical project management, scheduling, and coding. Graduate of the University of Washington’s full stack web development program studying React, JavaScript (ES6), HTML, CSS, and Node.js. In addition, holds a Master of Science in Information Management and Project Management from Grantham University with years of experience working with cross-functional teams with competing priorities to get the job done on-time and on budget. Fascinated by web technologies, specifically back-end development, and skilled in process improvement and breaking down problems to systematically find solutions.</Typography>

                        <CardActions>
                            <IconButton
                                className={classes.giticon} href='https://github.com/lbcessna'>
                                <GitHub ></GitHub>
                            </IconButton>
                            <IconButton
                                className={classes.linkedin}
                                href='https://www.linkedin.com/in/larry-cessna/'>
                                <LinkedIn></LinkedIn>
                            </IconButton>
                        </CardActions>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card} raised={true}>
                    <CardContent>
                        <Typography variant='h5'>Daniel Yoder</Typography>
                        <Typography>Full Stack Web Developer incorporating education in Communications and experience in Business Management with certificate in Full Stack Web Development from the University of Washington. Known for extreme focus and strong problem-solving skills using JavaScript, REACT, HTML, CSS, NODE.js, MySQL, and Bootstrap. Passionate about providing a world class user experience and streamlined functionality both to developers and end users.</Typography>
                        <CardActions>
                            <IconButton
                                className={classes.giticon} href='https://github.com/dyoder838'>
                                <GitHub ></GitHub>
                            </IconButton>
                            <IconButton
                                className={classes.linkedin}
                                href='https://www.linkedin.com/in/daniel-j-yoder/'>
                                <LinkedIn></LinkedIn>
                            </IconButton>
                        </CardActions>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        src='https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_200/v1607121332/minnesvart/DanYoder_s1jtgc.jpg'
                    />

                </Card>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.card} raised={true}>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        src='https://res.cloudinary.com/crowandrew/image/upload/c_scale,h_200,w_200/v1607119510/minnesvart/Upwork_Profile_Pic_d1wzee.jpg'
                    />
                    <CardContent>
                        <Typography variant='h5'>Mike Fallesen</Typography>
                        <Typography>Front End Engineer with a strong work ethic and problems solving skills. Certified as a full stack developer from the University of Washington with skills in Node.js, React.js and JavaScript along with a bevy of frameworks and libraries.I constantly strive to innovate and bring my skills to the table to work inside a field that's constantly changing and requiring new solutions to new problems. As a US Army Veteran I am able to keep myself focused on the task at hand and adapt seamlessly to changes and tangents that work may dictate. I am looking forward to being able to leverage my skills as  a part of a team to build a better web experience for users.</Typography>
                        <CardActions>
                            <IconButton
                                className={classes.giticon} href='https://github.com/mfallesen'>
                                <GitHub ></GitHub>
                            </IconButton>
                            <IconButton
                                className={classes.linkedin}
                                href='www.linkedin.com/in/mikael-fallesen'>
                                <LinkedIn></LinkedIn>
                            </IconButton>
                        </CardActions>
                    </CardContent>

                </Card>
            </Grid>

        </Grid>
    )
}
