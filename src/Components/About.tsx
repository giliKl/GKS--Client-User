import React from "react"
import {
  Box,
  CardContent,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Lock,
  Security,
  Cloud,
  Speed,
  Verified,
  Shield,
  Group,
  Business,
  Visibility,
  TrendingUp,
  Star,
  CheckCircle,
  Timeline,
} from "@mui/icons-material"

const About: React.FC = () => {
  const features = [
    { icon: <Lock sx={{ color: "#fff" }}/>, title: "Advanced Security", description: "Military-grade encryption" },
    { icon: <Cloud sx={{ color: "#fff" }}/>, title: "Cloud Storage", description: "99.9% uptime guarantee" },
    { icon: <Speed sx={{ color: "#fff" }}/>, title: "Fast Performance", description: "Lightning-fast operations" },
    { icon: <Group sx={{ color: "#fff" }}/>, title: "Secure Sharing", description: "Protected file sharing" },
    { icon: <Shield sx={{ color: "#fff" }}/>, title: "Data Protection", description: "Complete privacy control" },
    { icon: <Verified sx={{ color: "#fff" }}/>, title: "Compliance", description: "Industry standards" },
  ]

  const principles = [
    {
      icon: <Security sx={{ color: "#fff" }}/>,
      title: "Security",
      description: "State-of-the-art encryption protects your data at rest and in transit",
    },
    {
      icon: <Visibility sx={{ color: "#fff" }}/>,
      title: "Privacy",
      description: "Your files remain private and accessible only to authorized users",
    },
    {
      icon: <TrendingUp sx={{ color: "#fff" }}/>,
      title: "Reliability",
      description: "Uninterrupted and secure file access whenever you need it",
    },
    {
      icon: <Verified sx={{ color: "#fff" }}/>,
      title: "Trust",
      description: "Committed to transparency and strong authentication measures",
    },
  ]

  const stats = [
    { number: "99.9%", label: "Uptime", icon: <Timeline sx={{ color: "#fff" }}/> },
    { number: "256-bit", label: "Encryption", icon: <Lock sx={{ color: "#fff" }}/> },
    { number: "24/7", label: "Monitoring", icon: <Shield sx={{ color: "#fff" }}/> },
    { number: "10K+", label: "Users", icon: <Group sx={{ color: "#fff" }}/> },
  ]

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Hero Section with Gradient */}
      <Fade in timeout={800}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #579FBA 0%, #3d7a94 50%, #2c5f75 100%)",
            color: "white",
            py: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "float 6s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-20px)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.05)",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />

          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid >
                <Slide direction="right" in timeout={1000}>
                  <Box>
                    <Typography variant="h2" fontWeight="bold" gutterBottom>
                      Secure File Management
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
                      Enterprise-Grade Security for Your Most Important Files
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.7, opacity: 0.95 }}>
                      Professional file management platform trusted by thousands of organizations worldwide
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
              <Grid >
                <Zoom in timeout={1200}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        mx: "auto",
                        mb: 2,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Business sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Trusted Worldwide
                    </Typography>
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Fade in timeout={1400}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(45deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid rgba(87, 159, 186, 0.1)",
              mt: -4,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid  key={index}>
                  <Zoom in timeout={1600 + index * 200}>
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#579FBA" : "#3d7a94",
                          mx: "auto",
                          mb: 2,
                          width: 60,
                          height: 60,
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Typography variant="h3" fontWeight="bold" color="#579FBA">
                        {stat.number}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>

        {/* About Section - Full Width */}
        <Slide direction="up" in timeout={1800}>
          <Paper
            elevation={4}
            sx={{
              mt: 6,
              borderRadius: 4,
              overflow: "hidden",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(90deg, rgba(87, 159, 186, 0.1) 0%, rgba(61, 122, 148, 0.1) 100%)",
                p: 4,
                borderBottom: "3px solid #579FBA",
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="#579FBA" gutterBottom>
                About Our Platform
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Leading the future of secure file management
              </Typography>
            </Box>
            <CardContent sx={{ p: 6 }}>
              <Grid container spacing={6}>
                <Grid >
                  <Typography variant="body1" paragraph sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    Our platform is committed to providing a secure and reliable solution for file management and
                    sharing. With cutting-edge encryption and an intuitive interface, we ensure your files remain safe,
                    accessible, and easily shared.
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    We understand the importance of your data and the trust you place in us. That's why we've built our
                    platform with security as the foundation.
                  </Typography>
                </Grid>
                <Grid >
                  <Typography variant="body1" paragraph sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    Whether you're sharing sensitive documents or collaborating with others, our platform provides the
                    tools and protection you need for complete peace of mind.
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    We use strong multi-factor authentication to verify users, ensuring that every action on our
                    platform is secure and accessible only by trusted parties.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Slide>

        {/* Features Section - Horizontal Layout */}
        <Fade in timeout={2000}>
          <Paper
            elevation={4}
            sx={{
              mt: 6,
              borderRadius: 4,
              background: "linear-gradient(135deg, #579FBA 0%, #3d7a94 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
                Key Features
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid  key={index}>
                    <Zoom in timeout={2200 + index * 100}>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          borderRadius: 3,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.2)",
                            transform: "translateY(-5px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            mx: "auto",
                            mb: 2,
                            width: 60,
                            height: 60,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Paper>
        </Fade>

        {/* Principles Section - List Format */}
        <Slide direction="up" in timeout={2400}>
          <Paper elevation={4} sx={{ mt: 6, borderRadius: 4 }}>
            <Box
              sx={{
                background: "linear-gradient(90deg, rgba(87, 159, 186, 0.1) 0%, rgba(61, 122, 148, 0.1) 100%)",
                p: 4,
                borderBottom: "3px solid #3d7a94",
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="#3d7a94" gutterBottom>
                Our Core Principles
              </Typography>
              <Typography variant="h6" color="text.secondary">
                The foundation of everything we do
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              <List>
                {principles.map((principle, index) => (
                  <React.Fragment key={index}>
                    <Fade in timeout={2600 + index * 200}>
                      <ListItem sx={{ py: 3 }}>
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              backgroundColor: index % 2 === 0 ? "#579FBA" : "#3d7a94",
                              width: 60,
                              height: 60,
                            }}
                          >
                            {principle.icon}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          sx={{ ml: 3 }}
                          primary={
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                              {principle.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                              {principle.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Fade>
                    {index < principles.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Paper>
        </Slide>

        {/* Commitment Section */}
        <Fade in timeout={3000}>
          <Paper
            elevation={6}
            sx={{
              mt: 6,
              mb: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "2px solid rgba(87, 159, 186, 0.2)",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" color="#579FBA" gutterBottom>
                  Our Commitment to You
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Enterprise Security"
                    sx={{ backgroundColor: "#579FBA", color: "white", fontSize: "1rem", py: 2 }}
                  />
                  <Chip
                    icon={<Star />}
                    label="24/7 Support"
                    sx={{ backgroundColor: "#3d7a94", color: "white", fontSize: "1rem", py: 2 }}
                  />
                  <Chip
                    icon={<Verified />}
                    label="Compliance Ready"
                    sx={{ backgroundColor: "#579FBA", color: "white", fontSize: "1rem", py: 2 }}
                  />
                </Box>
              </Box>
              <Grid container spacing={4}>
                <Grid >
                  <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    We understand the importance of your data and the trust you place in us. That's why we've built our
                    platform with security as the foundation. Whether you're sharing sensitive documents or
                    collaborating with others, our platform provides the tools and protection you need.
                  </Typography>
                </Grid>
                <Grid >
                  <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    Our continuous monitoring and regular security updates ensure that your data remains protected
                    against emerging threats. We use strong multi-factor authentication to verify users, ensuring that
                    every action on our platform is secure.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}

export default About
