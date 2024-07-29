import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import styled from '../utils/styled'

const serverCode = `
namespace JwtValidation
{
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public static class NotSecureJwtTokenHandler
    {
        public static ClaimsPrincipal Parse(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                // Gettting error while validating token. So reading it and parsing.
                // Is it enough for securit validation purpose?
                // Hope so. Not a secuity expert.
                // Do you know what should be done?
                //var key = Encoding.UTF8.GetBytes(Constants.Secret);
                //var validationParameters = new TokenValidationParameters
                //{
                //    ValidateIssuerSigningKey = true,
                //    IssuerSigningKey = new SymmetricSecurityKey(key),
                //    ValidateIssuer = false,
                //    ValidateAudience = false
                //};

                // var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                // return principal;

                var jwtToken = tokenHandler.ReadJwtToken(token);
                var uniqueName = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

                return new ClaimsPrincipal(new ClaimsIdentity(new[] {
                        new Claim(ClaimTypes.Name, uniqueName)
                    }));
            }
            catch (Exception ex)
            {
                // Log exception if needed
            }

            return null;
        }

        public static string GenerateJwtToken(string subject)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.Secret));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, subject) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
`

function IndexPage() {
  return (
    <Page>
      <Container>
        <PageContent>
          <h1>Welcome!</h1>
          <p>Welcome to the another CTF challenge.</p>
          <p>This project is intended as demostration of a simple CTF challenge for JWT validation.</p>
          <h2>Challenge</h2>
          <p>Can you access the team details? Go to Teams and select a team.</p>
          <h3>Details</h3>
          <p>At server below code demostrates how JWT is validated or parsed.</p>
          <pre style={{ border: '1px black solid', width: '80vh' }}>
            <code>{serverCode}</code>
          </pre>
          <h2>Are you having fun? :)</h2>
        </PageContent>
      </Container>
    </Page>
  )
}

export default IndexPage

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`
